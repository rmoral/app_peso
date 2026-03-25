export const MOTIVATIONAL_QUOTES = [
  { text: 'El único mal entrenamiento es el que no se hace.', author: 'Anónimo' },
  { text: 'Tu cuerpo puede soportar casi todo. Es tu mente la que tienes que convencer.', author: 'Anónimo' },
  { text: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' },
  { text: 'El dolor que sientes hoy será la fuerza que sentirás mañana.', author: 'Anónimo' },
  { text: 'Cada logro comienza con la decisión de intentarlo.', author: 'John F. Kennedy' },
  { text: 'No se trata de ser el mejor, se trata de ser mejor que ayer.', author: 'Anónimo' },
  { text: 'La disciplina es el puente entre las metas y los logros.', author: 'Jim Rohn' },
  { text: 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar.', author: 'Winston Churchill' },
  { text: 'Cuida tu cuerpo. Es el único lugar que tienes para vivir.', author: 'Jim Rohn' },
  { text: 'La constancia es la madre del dominio.', author: 'Anónimo' },
  { text: 'Hazlo ahora. A veces "luego" se convierte en "nunca".', author: 'Anónimo' },
  { text: 'Los resultados que obtiene una persona dependen de lo que hace cuando no tiene ganas.', author: 'Anónimo' },
  { text: 'El secreto para salir adelante es empezar.', author: 'Mark Twain' },
  { text: 'No te detengas cuando estés cansado. Detente cuando hayas terminado.', author: 'Anónimo' },
  { text: 'Un año desde ahora desearás haber empezado hoy.', author: 'Karen Lamb' },
  { text: 'Lo único imposible es aquello que no intentas.', author: 'Anónimo' },
  { text: 'Si no construyes tu sueño, alguien te contratará para construir el suyo.', author: 'Tony Gaskins' },
  { text: 'Pequeños pasos cada día llevan a grandes resultados.', author: 'Anónimo' },
  { text: 'La motivación te pone en marcha, el hábito te mantiene.', author: 'Jim Ryun' },
  { text: 'Cree en ti mismo y todo será posible.', author: 'Anónimo' },
  { text: 'El cambio no vendrá si esperamos a otra persona. Nosotros somos el cambio.', author: 'Barack Obama' },
  { text: 'Cada mañana tienes dos opciones: seguir durmiendo o levantarte y perseguir tus sueños.', author: 'Anónimo' },
  { text: 'La fuerza no viene de la capacidad física sino de una voluntad indomable.', author: 'Mahatma Gandhi' },
  { text: 'No importa lo lento que vayas, siempre y cuando no te detengas.', author: 'Confucio' },
  { text: 'Tu único límite eres tú mismo.', author: 'Anónimo' },
  { text: 'El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.', author: 'Proverbio chino' },
  { text: 'Nada cambiará si tú no cambias.', author: 'Anónimo' },
  { text: 'La perseverancia no es una carrera larga, son muchas carreras cortas una tras otra.', author: 'Walter Elliot' },
  { text: 'Haz de cada día tu obra maestra.', author: 'John Wooden' },
  { text: 'El dolor es temporal. Rendirse dura para siempre.', author: 'Lance Armstrong' },
];

export function getDailyQuote(dateStr: string): { text: string; author: string } {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
}
