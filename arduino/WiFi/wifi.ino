#include <SoftwareSerial.h>
#define DEBUG true
SoftwareSerial esp8266(4,5); // make RX Arduino line is pin 5, make TX Arduino line is pin 6.
    
void setup()
{
    Serial.begin(9600);
    configurarWifi();
}

 void configurarWifi()
 {
    esp8266.begin(115200); // your esp's baud rate might be different
    enviarComando("AT+RST\r\n",2000,DEBUG); // reset module
//    enviarComando("AT+CWMODE=2\r\n",1000,DEBUG); // configure as Access point mode
//    enviarComando("AT+CWSAP=\"AccessPointname\",\"password\",1,4\r\n",1000,DEBUG); //this sets access point name and password //[channel -> 1 to 10] , [securitytype -> 0 – Open / 2 – WPA_PSK /3 – WPA2_PSK / 4 – WPA_WPA2_PSK ]
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
            // subtract 48 because the read() function returns 
            // the ASCII decimal value and 0 (the first decimal number) starts at 48
            int idConexion = esp8266.read() - 48; 
            //To read the url sent by the client
            String mensaje;
            esp8266.find("?");
            delay(100);
            mensaje = esp8266.readStringUntil(' ');
            String comando = mensaje.substring(0);

            if (comando == "X") {
                String json = "{ \"temperatura\": \"";
                json += valorTemperatura;
                json += "\"}";
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

            if (comando == "G") {
              Serial.print("Adelante");
            }
            
        }
    }
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
