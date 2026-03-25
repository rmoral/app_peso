import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, Alert, Modal, FlatList,
} from 'react-native';
import { Colors } from '../constants/colors';
import { COMMON_FOODS, MEAL_LABELS, MEAL_ICONS } from '../constants/foods';
import { useFoodLog } from '../hooks/useFoodLog';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FoodItem, MealType } from '../types';

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export function FoodScreen() {
  const {
    addEntry, deleteEntry, getTodayCalories, getTodayMacros,
    getTodayByMeal, getMealCalories, calorieGoal,
  } = useFoodLog();

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Custom food state
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [customPortion, setCustomPortion] = useState('1 ración');

  const todayCalories = getTodayCalories();
  const macros = getTodayMacros();
  const calorieProgress = Math.min(todayCalories / calorieGoal, 1);
  const remaining = calorieGoal - todayCalories;

  const filteredFoods = search.trim()
    ? COMMON_FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : COMMON_FOODS;

  const openAddModal = (meal: MealType) => {
    setSelectedMeal(meal);
    setSearch('');
    setSelectedFood(null);
    setQuantity('1');
    setShowCustom(false);
    setShowModal(true);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;
    const qty = parseFloat(quantity) || 1;
    addEntry(selectedFood, selectedMeal, qty);
    setShowModal(false);
  };

  const handleAddCustomFood = () => {
    const cal = parseInt(customCalories);
    if (!customName.trim() || isNaN(cal) || cal <= 0) {
      Alert.alert('Error', 'Indica nombre y calorías válidas');
      return;
    }
    const customFood: FoodItem = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      calories: cal,
      protein: parseFloat(customProtein) || 0,
      carbs: parseFloat(customCarbs) || 0,
      fat: parseFloat(customFat) || 0,
      portion: customPortion || '1 ración',
    };
    const qty = parseFloat(quantity) || 1;
    addEntry(customFood, selectedMeal, qty);
    setShowModal(false);
    setCustomName('');
    setCustomCalories('');
    setCustomProtein('');
    setCustomCarbs('');
    setCustomFat('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar este alimento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteEntry(id) },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Alimentación</Text>

      {/* Calorie summary */}
      <Card>
        <View style={styles.calSummary}>
          <View style={styles.calMain}>
            <Text style={styles.calConsumed}>{todayCalories}</Text>
            <Text style={styles.calUnit}>/ {calorieGoal} kcal</Text>
          </View>
          <ProgressBar
            progress={calorieProgress}
            color={todayCalories > calorieGoal ? Colors.error : Colors.primary}
            height={10}
          />
          <Text style={[styles.calRemaining, remaining < 0 && { color: Colors.error }]}>
            {remaining >= 0 ? `${remaining} kcal restantes` : `${Math.abs(remaining)} kcal excedidas`}
          </Text>
        </View>

        {/* Macros */}
        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.protein)}g</Text>
            <Text style={styles.macroLabel}>Proteína</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.carbs)}g</Text>
            <Text style={styles.macroLabel}>Carbos</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{Math.round(macros.fat)}g</Text>
            <Text style={styles.macroLabel}>Grasas</Text>
          </View>
        </View>
      </Card>

      {/* Meals */}
      {MEAL_ORDER.map(meal => {
        const mealEntries = getTodayByMeal(meal);
        const mealCal = getMealCalories(meal);
        return (
          <Card key={meal} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealIcon}>{MEAL_ICONS[meal]}</Text>
              <Text style={styles.mealTitle}>{MEAL_LABELS[meal]}</Text>
              <Text style={styles.mealCal}>{mealCal} kcal</Text>
            </View>

            {mealEntries.map(entry => (
              <TouchableOpacity
                key={entry.id}
                style={styles.foodEntry}
                onLongPress={() => handleDelete(entry.id)}
              >
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>
                    {entry.food.name}
                    {entry.quantity > 1 ? ` x${entry.quantity}` : ''}
                  </Text>
                  <Text style={styles.foodPortion}>{entry.food.portion}</Text>
                </View>
                <Text style={styles.foodCal}>{Math.round(entry.food.calories * entry.quantity)} kcal</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={() => openAddModal(meal)}>
              <Text style={styles.addBtnText}>+ Añadir alimento</Text>
            </TouchableOpacity>
          </Card>
        );
      })}

      <Text style={styles.xpHint}>+5 XP por cada alimento registrado</Text>

      {/* Add Food Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {MEAL_ICONS[selectedMeal]} Añadir a {MEAL_LABELS[selectedMeal]}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {!showCustom ? (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar alimento..."
                placeholderTextColor={Colors.disabled}
                value={search}
                onChangeText={setSearch}
                autoFocus
              />

              <FlatList
                data={filteredFoods}
                keyExtractor={item => item.id}
                style={styles.foodList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.foodOption,
                      selectedFood?.id === item.id && styles.foodOptionSelected,
                    ]}
                    onPress={() => setSelectedFood(item)}
                  >
                    <View style={styles.foodOptionInfo}>
                      <Text style={styles.foodOptionName}>{item.name}</Text>
                      <Text style={styles.foodOptionPortion}>{item.portion}</Text>
                    </View>
                    <View style={styles.foodOptionRight}>
                      <Text style={styles.foodOptionCal}>{item.calories} kcal</Text>
                      {item.protein !== undefined && (
                        <Text style={styles.foodOptionMacro}>
                          P:{item.protein} C:{item.carbs} G:{item.fat}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />

              {selectedFood && (
                <View style={styles.quantityRow}>
                  <Text style={styles.qtyLabel}>Cantidad:</Text>
                  <TextInput
                    style={styles.qtyInput}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="decimal-pad"
                  />
                  <Text style={styles.qtyTotal}>
                    = {Math.round((selectedFood.calories) * (parseFloat(quantity) || 1))} kcal
                  </Text>
                </View>
              )}

              <View style={styles.modalActions}>
                <Button
                  title="Añadir alimento"
                  onPress={handleAddFood}
                  disabled={!selectedFood}
                />
                <TouchableOpacity style={styles.customLink} onPress={() => setShowCustom(true)}>
                  <Text style={styles.customLinkText}>¿No encuentras tu alimento? Añade uno personalizado</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <ScrollView style={styles.customForm}>
              <Text style={styles.customTitle}>Alimento personalizado</Text>

              <Text style={styles.fieldLabel}>Nombre *</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Ej: Ensalada casera"
                placeholderTextColor={Colors.disabled}
                value={customName}
                onChangeText={setCustomName}
              />

              <Text style={styles.fieldLabel}>Calorías (kcal) *</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Ej: 250"
                placeholderTextColor={Colors.disabled}
                value={customCalories}
                onChangeText={setCustomCalories}
                keyboardType="number-pad"
              />

              <View style={styles.macroFields}>
                <View style={styles.macroField}>
                  <Text style={styles.fieldLabel}>Proteína (g)</Text>
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="0"
                    placeholderTextColor={Colors.disabled}
                    value={customProtein}
                    onChangeText={setCustomProtein}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={styles.macroField}>
                  <Text style={styles.fieldLabel}>Carbos (g)</Text>
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="0"
                    placeholderTextColor={Colors.disabled}
                    value={customCarbs}
                    onChangeText={setCustomCarbs}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={styles.macroField}>
                  <Text style={styles.fieldLabel}>Grasas (g)</Text>
                  <TextInput
                    style={styles.fieldInput}
                    placeholder="0"
                    placeholderTextColor={Colors.disabled}
                    value={customFat}
                    onChangeText={setCustomFat}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <Text style={styles.fieldLabel}>Porción</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Ej: 1 plato"
                placeholderTextColor={Colors.disabled}
                value={customPortion}
                onChangeText={setCustomPortion}
              />

              <Text style={styles.fieldLabel}>Cantidad</Text>
              <TextInput
                style={styles.fieldInput}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="decimal-pad"
              />

              <View style={styles.modalActions}>
                <Button title="Añadir personalizado" onPress={handleAddCustomFood} />
                <TouchableOpacity style={styles.customLink} onPress={() => setShowCustom(false)}>
                  <Text style={styles.customLinkText}>Volver a la búsqueda</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text },

  // Calorie summary
  calSummary: { gap: 8 },
  calMain: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  calConsumed: { fontSize: 36, fontWeight: '800', color: Colors.text },
  calUnit: { fontSize: 16, color: Colors.textSecondary },
  calRemaining: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },

  // Macros
  macrosRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border },
  macroItem: { alignItems: 'center' },
  macroValue: { fontSize: 18, fontWeight: '700', color: Colors.text },
  macroLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },

  // Meal cards
  mealCard: { gap: 8 },
  mealHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mealIcon: { fontSize: 20 },
  mealTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, flex: 1 },
  mealCal: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  foodEntry: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  foodInfo: { flex: 1 },
  foodName: { fontSize: 15, color: Colors.text, fontWeight: '500' },
  foodPortion: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  foodCal: { fontSize: 14, fontWeight: '600', color: Colors.text },
  addBtn: { paddingVertical: 10, alignItems: 'center' },
  addBtnText: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  xpHint: { fontSize: 12, color: Colors.accent, fontWeight: '600', textAlign: 'center' },

  // Modal
  modal: { flex: 1, backgroundColor: Colors.background, padding: 20, paddingTop: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: Colors.text },
  closeBtn: { fontSize: 24, color: Colors.textSecondary, padding: 4 },
  searchInput: { backgroundColor: Colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: Colors.text, borderWidth: 1, borderColor: Colors.border, marginBottom: 12 },
  foodList: { flex: 1, marginBottom: 8 },
  foodOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 10, padding: 12, marginBottom: 6 },
  foodOptionSelected: { borderWidth: 2, borderColor: Colors.primary, backgroundColor: Colors.primaryLight + '15' },
  foodOptionInfo: { flex: 1 },
  foodOptionName: { fontSize: 15, fontWeight: '600', color: Colors.text },
  foodOptionPortion: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  foodOptionRight: { alignItems: 'flex-end' },
  foodOptionCal: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  foodOptionMacro: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 4 },
  qtyLabel: { fontSize: 14, color: Colors.text, fontWeight: '600' },
  qtyInput: { backgroundColor: Colors.surface, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, width: 60, textAlign: 'center', fontSize: 16, borderWidth: 1, borderColor: Colors.border, color: Colors.text },
  qtyTotal: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  modalActions: { gap: 12, paddingBottom: 20 },
  customLink: { alignItems: 'center', padding: 8 },
  customLinkText: { fontSize: 14, color: Colors.primary, textDecorationLine: 'underline' },

  // Custom food form
  customForm: { flex: 1 },
  customTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: Colors.text, marginBottom: 4, marginTop: 12 },
  fieldInput: { backgroundColor: Colors.surface, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, borderWidth: 1, borderColor: Colors.border, color: Colors.text },
  macroFields: { flexDirection: 'row', gap: 10 },
  macroField: { flex: 1 },
});
