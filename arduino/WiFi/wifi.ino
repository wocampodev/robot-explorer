#include <SoftwareSerial.h>
#define DEBUG true
SoftwareSerial esp8266(4,5);

float valorTemperatura = 0;
float valorConcentracionGas = 0;
    
void setup()
{
    Serial.begin(9600);
    configurarWifi();
}

void configurarWifi()
{
    esp8266.begin(115200);
    enviarComando("AT+RST\r\n",2000,DEBUG);
    enviarComando("AT+CWMODE=3\r\n",1000,DEBUG);
    enviarComando("AT+CWJAP=\"CLARO-B612-6417\",\"10gFTNtLm2\"\r\n", 6000, DEBUG);
    enviarComando("AT+CIFSR\r\n",2000,DEBUG);
    enviarComando("AT+CIPMUX=1\r\n",1000,DEBUG);
    enviarComando("AT+CIPSERVER=1,80\r\n",1000,DEBUG);
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
            }

            if (comando == "D") {
                moverAtras();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
            }

            if (comando == "L") {
                moverIzquierda();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
            }

            if (comando == "R") {
                moverDerecha();
                String json = "{ \"respuesta\": \"ok\"}";
                enviarRespuesta(json, idConexion);
            }

            if (comando == "S") {
                detenerse();
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
    String comandoCierre = "AT+CIPCLOSE="; 
    comandoCierre += idConexion;
    comandoCierre += "\r\n";
    enviarComando(comandoCierre,300,DEBUG);
}

void enviarComando(String comando, const int duracion, boolean debug)
{
    esp8266.print(comando);
    long int tiempo = millis();

    while( (tiempo + duracion) > millis()) {
      while(esp8266.available()) {
        Serial.write(esp8266.read());
      }  
    }
}

void loop()
{
    moduloWifi();
}
