const int pinTemperatura= A0;
float valorTemperatura = 0;

void setup()
{
  Serial.begin(9600);
}

void moduloTemperatura()
{
  int lectura = analogRead(pinTemperatura);
  float voltaje = 5.0 /1024 * lectura;
  // Si usas un sensor LM35DZ la formula sera
  valorTemperatura = voltaje * 100 ;
  // valorTemperatura = voltaje * 100 - 50;
  // float tempF = valorTemperatura * 1.8 + 32;
  Serial.print("Grados Centrigrados = "); 
  Serial.println(valorTemperatura);                          
}

void loop()
{
  moduloTemperatura();
  delay(3000);        
}
