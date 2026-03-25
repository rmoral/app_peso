import { FoodItem } from '../types';

export const COMMON_FOODS: FoodItem[] = [
  // === DESAYUNO ===
  { id: 'f1', name: 'Tostada integral', calories: 70, protein: 3, carbs: 12, fat: 1, portion: '1 rebanada' },
  { id: 'f2', name: 'Huevo cocido', calories: 78, protein: 6, carbs: 1, fat: 5, portion: '1 unidad' },
  { id: 'f3', name: 'Huevo revuelto', calories: 91, protein: 6, carbs: 1, fat: 7, portion: '1 unidad' },
  { id: 'f4', name: 'Yogur natural', calories: 59, protein: 10, carbs: 4, fat: 0.7, portion: '1 vaso (200ml)' },
  { id: 'f5', name: 'Yogur griego', calories: 130, protein: 12, carbs: 5, fat: 7, portion: '1 vaso (200ml)' },
  { id: 'f6', name: 'Leche entera', calories: 130, protein: 8, carbs: 12, fat: 5, portion: '1 vaso (250ml)' },
  { id: 'f7', name: 'Leche desnatada', calories: 83, protein: 8, carbs: 12, fat: 0.2, portion: '1 vaso (250ml)' },
  { id: 'f8', name: 'Café con leche', calories: 60, protein: 3, carbs: 5, fat: 3, portion: '1 taza' },
  { id: 'f9', name: 'Cereales integrales', calories: 180, protein: 4, carbs: 36, fat: 2, portion: '1 bol (50g)' },
  { id: 'f10', name: 'Avena', calories: 150, protein: 5, carbs: 27, fat: 3, portion: '40g' },
  { id: 'f11', name: 'Tostada con aceite', calories: 120, protein: 3, carbs: 12, fat: 7, portion: '1 rebanada' },
  { id: 'f12', name: 'Tostada con tomate', calories: 90, protein: 3, carbs: 15, fat: 3, portion: '1 rebanada' },
  { id: 'f13', name: 'Zumo de naranja', calories: 112, protein: 2, carbs: 26, fat: 0.5, portion: '1 vaso (250ml)' },
  { id: 'f14', name: 'Mermelada', calories: 50, protein: 0, carbs: 13, fat: 0, portion: '1 cucharada (20g)' },
  { id: 'f15', name: 'Mantequilla', calories: 72, protein: 0, carbs: 0, fat: 8, portion: '1 cucharada (10g)' },

  // === FRUTAS ===
  { id: 'f16', name: 'Plátano', calories: 105, protein: 1, carbs: 27, fat: 0.4, portion: '1 unidad' },
  { id: 'f17', name: 'Manzana', calories: 72, protein: 0.4, carbs: 19, fat: 0.2, portion: '1 unidad' },
  { id: 'f18', name: 'Naranja', calories: 62, protein: 1, carbs: 15, fat: 0.2, portion: '1 unidad' },
  { id: 'f19', name: 'Fresas', calories: 32, protein: 0.7, carbs: 8, fat: 0.3, portion: '100g' },
  { id: 'f20', name: 'Uvas', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, portion: '100g' },
  { id: 'f21', name: 'Pera', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, portion: '1 unidad' },
  { id: 'f22', name: 'Kiwi', calories: 42, protein: 0.8, carbs: 10, fat: 0.4, portion: '1 unidad' },
  { id: 'f23', name: 'Sandía', calories: 30, protein: 0.6, carbs: 8, fat: 0.2, portion: '100g' },
  { id: 'f24', name: 'Melocotón', calories: 39, protein: 0.9, carbs: 10, fat: 0.3, portion: '1 unidad' },

  // === COMIDAS PRINCIPALES ===
  { id: 'f25', name: 'Arroz blanco', calories: 206, protein: 4, carbs: 45, fat: 0.4, portion: '1 ración (160g)' },
  { id: 'f26', name: 'Arroz integral', calories: 216, protein: 5, carbs: 45, fat: 1.8, portion: '1 ración (160g)' },
  { id: 'f27', name: 'Pasta cocida', calories: 220, protein: 8, carbs: 43, fat: 1.3, portion: '1 ración (160g)' },
  { id: 'f28', name: 'Pechuga de pollo', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '1 ración (150g)' },
  { id: 'f29', name: 'Muslo de pollo', calories: 209, protein: 26, carbs: 0, fat: 11, portion: '1 ración (150g)' },
  { id: 'f30', name: 'Filete de ternera', calories: 250, protein: 26, carbs: 0, fat: 15, portion: '1 ración (150g)' },
  { id: 'f31', name: 'Salmón', calories: 208, protein: 20, carbs: 0, fat: 13, portion: '1 ración (125g)' },
  { id: 'f32', name: 'Merluza', calories: 90, protein: 18, carbs: 0, fat: 2, portion: '1 ración (150g)' },
  { id: 'f33', name: 'Atún en lata', calories: 116, protein: 26, carbs: 0, fat: 1, portion: '1 lata (80g)' },
  { id: 'f34', name: 'Lentejas cocidas', calories: 230, protein: 18, carbs: 40, fat: 0.8, portion: '1 plato (200g)' },
  { id: 'f35', name: 'Garbanzos cocidos', calories: 270, protein: 15, carbs: 45, fat: 4, portion: '1 plato (200g)' },
  { id: 'f36', name: 'Judías blancas cocidas', calories: 240, protein: 17, carbs: 43, fat: 0.8, portion: '1 plato (200g)' },
  { id: 'f37', name: 'Patata cocida', calories: 130, protein: 3, carbs: 30, fat: 0.1, portion: '1 unidad (150g)' },
  { id: 'f38', name: 'Ensalada mixta', calories: 50, protein: 2, carbs: 8, fat: 1, portion: '1 bol' },
  { id: 'f39', name: 'Tortilla francesa', calories: 180, protein: 12, carbs: 1, fat: 14, portion: '2 huevos' },
  { id: 'f40', name: 'Tortilla de patata', calories: 200, protein: 8, carbs: 18, fat: 11, portion: '1 porción (120g)' },

  // === VERDURAS ===
  { id: 'f41', name: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: '1 unidad (100g)' },
  { id: 'f42', name: 'Lechuga', calories: 5, protein: 0.5, carbs: 1, fat: 0.1, portion: '1 puñado (30g)' },
  { id: 'f43', name: 'Zanahoria', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, portion: '1 unidad (100g)' },
  { id: 'f44', name: 'Brócoli', calories: 35, protein: 2.4, carbs: 7, fat: 0.4, portion: '100g' },
  { id: 'f45', name: 'Espinacas', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, portion: '100g' },
  { id: 'f46', name: 'Calabacín', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, portion: '100g' },
  { id: 'f47', name: 'Pimiento', calories: 26, protein: 1, carbs: 6, fat: 0.2, portion: '1 unidad (100g)' },
  { id: 'f48', name: 'Cebolla', calories: 40, protein: 1.1, carbs: 9, fat: 0.1, portion: '1 unidad (100g)' },

  // === PAN Y CEREALES ===
  { id: 'f49', name: 'Pan blanco', calories: 80, protein: 3, carbs: 15, fat: 1, portion: '1 rebanada (30g)' },
  { id: 'f50', name: 'Pan integral', calories: 70, protein: 3, carbs: 12, fat: 1, portion: '1 rebanada (30g)' },
  { id: 'f51', name: 'Baguette', calories: 120, protein: 4, carbs: 24, fat: 1, portion: '1 trozo (50g)' },

  // === SNACKS Y OTROS ===
  { id: 'f52', name: 'Almendras', calories: 160, protein: 6, carbs: 6, fat: 14, portion: '30g (puñado)' },
  { id: 'f53', name: 'Nueces', calories: 185, protein: 4, carbs: 4, fat: 18, portion: '30g (puñado)' },
  { id: 'f54', name: 'Aceite de oliva', calories: 90, protein: 0, carbs: 0, fat: 10, portion: '1 cucharada (10ml)' },
  { id: 'f55', name: 'Queso fresco', calories: 70, protein: 8, carbs: 2, fat: 3, portion: '1 porción (50g)' },
  { id: 'f56', name: 'Queso curado', calories: 180, protein: 12, carbs: 0.5, fat: 15, portion: '1 porción (50g)' },
  { id: 'f57', name: 'Jamón serrano', calories: 120, protein: 16, carbs: 0, fat: 6, portion: '50g' },
  { id: 'f58', name: 'Jamón york', calories: 60, protein: 10, carbs: 1, fat: 2, portion: '2 lonchas (40g)' },
  { id: 'f59', name: 'Chocolate negro', calories: 170, protein: 2, carbs: 13, fat: 12, portion: '30g (2 onzas)' },
  { id: 'f60', name: 'Galletas María', calories: 130, protein: 2, carbs: 22, fat: 4, portion: '4 galletas (30g)' },

  // === BEBIDAS ===
  { id: 'f61', name: 'Agua', calories: 0, protein: 0, carbs: 0, fat: 0, portion: '1 vaso (250ml)' },
  { id: 'f62', name: 'Refresco', calories: 140, protein: 0, carbs: 35, fat: 0, portion: '1 lata (330ml)' },
  { id: 'f63', name: 'Cerveza', calories: 150, protein: 1, carbs: 13, fat: 0, portion: '1 caña (330ml)' },
  { id: 'f64', name: 'Vino tinto', calories: 125, protein: 0, carbs: 4, fat: 0, portion: '1 copa (150ml)' },
  { id: 'f65', name: 'Café solo', calories: 2, protein: 0, carbs: 0, fat: 0, portion: '1 taza' },

  // === COMIDA RÁPIDA / PREPARADA ===
  { id: 'f66', name: 'Pizza margarita', calories: 270, protein: 11, carbs: 33, fat: 10, portion: '1 porción (125g)' },
  { id: 'f67', name: 'Bocadillo de jamón', calories: 300, protein: 18, carbs: 35, fat: 10, portion: '1 unidad' },
  { id: 'f68', name: 'Hamburguesa', calories: 350, protein: 20, carbs: 30, fat: 16, portion: '1 unidad' },
  { id: 'f69', name: 'Croquetas', calories: 200, protein: 6, carbs: 18, fat: 12, portion: '4 unidades' },
  { id: 'f70', name: 'Gazpacho', calories: 50, protein: 1, carbs: 5, fat: 3, portion: '1 vaso (250ml)' },
];

export const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Desayuno',
  lunch: 'Comida',
  dinner: 'Cena',
  snack: 'Snack',
};

export const MEAL_ICONS: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

export const DEFAULT_CALORIE_GOAL = 2000;
