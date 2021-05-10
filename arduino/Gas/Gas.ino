const int pinGas = A1;      // Pin del sensor
const int RL_MODULO_GAS = 5;      // Resistencia RL del modulo en Kilo ohms
const int R0_MODULO_GAS = 10;          // Resistencia R0 del sensor en Kilo ohms
// Datos para lectura multiple
const int tiempoIntervaloLectura = 100;    // Tiempo entre muestras
const int cantidadMuestras = 5;       // Numero muestras
const float X0 = 200;
const float Y0 = 1.7;
const float X1 = 10000;
const float Y1 = 0.28;
// Puntos de la curva de concentración {X, Y}
const float punto0[] = { log10(X0), log10(Y0) };
const float punto1[] = { log10(X1), log10(Y1) };
// Calcular pendiente y coordenada abscisas
const float scope = (punto1[1] - punto0[1]) / (punto1[0] - punto0[0]);
const float coord = punto0[1] - punto0[0] * scope;

float valorConcentracionGas = 0;

void moduloGas()
{
   float resistenciaPromedio = leerGas(pinGas);
   valorConcentracionGas = obtenerConcentracion(resistenciaPromedio/R0_MODULO_GAS);
   
   // Mostrar el valor de la concentración por serial
   Serial.println("Concentración: ");
   Serial.println(valorConcentracionGas);
}
// Obtener la resistencia promedio en N muestras
float leerGas(int pinGas)
{
   float resistencia = 0;
   for (int i = 0;i<cantidadMuestras;i++) {
      resistencia += obtenerResistenciaSensor(analogRead(pinGas));
      delay(tiempoIntervaloLectura);
   }
   return resistencia / cantidadMuestras;
}
// Obtener resistencia a partir de la lectura analogica
float obtenerResistenciaSensor(int raw_adc)
{
   return (((float)RL_MODULO_GAS / 1000.0*(1023 - raw_adc) / raw_adc));
}
// Obtener concentracion 10^(coord + scope * log (rs/r0)
float obtenerConcentracion(float rs_ro_ratio)
{
   return pow(10, coord + scope * log(rs_ro_ratio));
}

void setup()
{
   Serial.begin(9600);
}
void loop()
{
   moduloGas();
   delay(3000);
}
