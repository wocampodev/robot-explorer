#include <SoftwareSerial.h>
#define DEBUG true
SoftwareSerial esp8266(4,5); // make RX Arduino line is pin 5, make TX Arduino line is pin 6.

float valorTemperatura = 0;
float valorConcentracionGas = 0;

const int AdelanteIzquierdaTrece = 13;
const int AtrasIzquierdaDoce = 12;
const int AdelanteDerechaDiez = 10;
const int AtrasDerechaOnce = 11;

boolean estaAvanzando = false;
    
void setup()
{
    Serial.begin(9600);
    pinMode(AdelanteDerechaDiez, OUTPUT);
    pinMode(AdelanteIzquierdaTrece, OUTPUT);
    pinMode(AtrasIzquierdaDoce, OUTPUT);
    pinMode(AtrasDerechaOnce, OUTPUT);
    configurarWifi();
}

void detenerse()
{
  estaAvanzando = false;
  digitalWrite(AdelanteDerechaDiez, LOW);
  digitalWrite(AdelanteIzquierdaTrece, LOW);
  digitalWrite(AtrasDerechaOnce, LOW);
  digitalWrite(AtrasIzquierdaDoce, LOW);
}

void moverAdelante()
{
  if (!estaAvanzando)
  {
    estaAvanzando = true;
    digitalWrite(AdelanteIzquierdaTrece, HIGH);
    digitalWrite(AdelanteDerechaDiez, HIGH);

    digitalWrite(AtrasIzquierdaDoce, LOW);
    digitalWrite(AtrasDerechaOnce, LOW);
  }
}

void moverAtras()
{

  estaAvanzando = false;
  digitalWrite(AtrasIzquierdaDoce, HIGH);
  digitalWrite(AtrasDerechaOnce, HIGH);
  digitalWrite(AdelanteIzquierdaTrece, LOW);
  digitalWrite(AdelanteDerechaDiez, LOW);
}

void moverDerecha()
{
  digitalWrite(AdelanteIzquierdaTrece, HIGH);
  digitalWrite(AtrasDerechaOnce, LOW);

  digitalWrite(AtrasIzquierdaDoce, LOW);
  digitalWrite(AdelanteDerechaDiez, LOW);
}

void moverIzquierda()
{
  digitalWrite(AtrasIzquierdaDoce, LOW);
  digitalWrite(AdelanteDerechaDiez, HIGH);

  digitalWrite(AdelanteIzquierdaTrece, LOW);
  digitalWrite(AtrasDerechaOnce, LOW);
}

 void configurarWifi()
 {
    esp8266.begin(115200); // your esp's baud rate might be different
    enviarComando("AT+RST\r\n",2000,DEBUG); // reset module
    enviarComando("AT+CWMODE=3\r\n",1000,DEBUG); // configure as Wireless Station mode
    enviarComando("AT+CWJAP=\"CLARO-B612-6417\",\"10gFTNtLm2\"\r\n", 6000, DEBUG); //Put Your SSID and password if activate as Station mode else comment down the line
    enviarComando("AT+CIFSR\r\n",2000,DEBUG); // get ip address
    enviarComando("AT+CIPMUX=1\r\n",1000,DEBUG); // configure for multiple connections
    enviarComando("AT+CIPSERVER=1,80\r\n",1000,DEBUG); // turn on server on port 80
 }
void moduloWifi()
{
    if(esp8266.available()) {
        if(esp8266.find("+IPD,")) {
            int idConexion = esp8266.read()-48;
            String mensaje;
            esp8266.find("?");
            delay(100);
            mensaje = esp8266.readStringUntil(' ');
            String comando = mensaje.substring(0);

            if (comando == "X") {
                String json = "{ \"temperatura\": \"";
                json += valorTemperatura;
                json += "\"}";
                enviarRespuesta(json, idConexion);
            }

            if (comando == "G") {
                moverAdelante();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
                detenerse();
            }

            if (comando == "D") {
                moverAtras();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
               delay(3000);
               detenerse();
            }

            if (comando == "L") {
                moverIzquierda();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
               delay(3000);
               detenerse();
            }

            if (comando == "R") {
                moverDerecha();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
               delay(3000);
               detenerse();
            }

            if (comando == "S") {
                detenerse();
                digitalWrite(AdelanteIzquierdaTrece, LOW);
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
            }
        }
    }
}

void enviarRespuesta(String json, int idConexion)
{
    String cipSend = "AT+CIPSEND=";
    cipSend += idConexion;
    cipSend += ",";
    cipSend += json.length();
    cipSend += "\r\n";
    enviarComando(cipSend,200,DEBUG);
    enviarComando(json,200,DEBUG);
    //BELOW THIS LINE CLOSE THE CONNECTION
    String comandoCierre = "AT+CIPCLOSE="; 
    comandoCierre += idConexion; // append connection id
    comandoCierre += "\r\n";
    enviarComando(comandoCierre,300,DEBUG);
}

void enviarComando(String comando, const int duracion, boolean debug)
{
    esp8266.print(comando); // send the read character to the esp8266
    long int tiempo = millis();

    while( (tiempo + duracion) > millis()) {
      while(esp8266.available()) {
        // The esp has data so display its output to the serial window 
        Serial.write(esp8266.read());
      }  
    }
}

void loop()
{
  moduloWifi();
}