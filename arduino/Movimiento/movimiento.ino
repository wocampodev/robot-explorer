const int motorIzquierdoSuperior = 13;
const int motorIzquierdoPosterior = 12;
const int motorDerechoSuperior = 10;
const int motorDerechoPosterior = 11;

boolean estaRetrocediendo = false;
    
void setup()
{
    Serial.begin(9600);
    pinMode(motorDerechoSuperior, OUTPUT);
    pinMode(motorIzquierdoSuperior, OUTPUT);
    pinMode(motorIzquierdoPosterior, OUTPUT);
    pinMode(motorDerechoPosterior, OUTPUT);
}

void detenerse()
{
    estaRetrocediendo = false;
    digitalWrite(motorDerechoSuperior, LOW);
    digitalWrite(motorIzquierdoSuperior, LOW);
    digitalWrite(motorDerechoPosterior, LOW);
    digitalWrite(motorIzquierdoPosterior, LOW);
}

void moverAdelante()
{
    if (!estaRetrocediendo)
    {
        estaRetrocediendo = true;
        digitalWrite(motorIzquierdoSuperior, HIGH);
        digitalWrite(motorDerechoSuperior, HIGH);

        digitalWrite(motorIzquierdoPosterior, LOW);
        digitalWrite(motorDerechoPosterior, LOW);
    }
}

void moverAtras()
{
    estaRetrocediendo = false;
    digitalWrite(motorIzquierdoPosterior, HIGH);
    digitalWrite(motorDerechoPosterior, HIGH);
    digitalWrite(motorIzquierdoSuperior, LOW);
    digitalWrite(motorDerechoSuperior, LOW);
}

void moverDerecha()
{
    digitalWrite(motorIzquierdoSuperior, HIGH);
    digitalWrite(motorDerechoPosterior, HIGH);

    digitalWrite(motorIzquierdoPosterior, LOW);
    digitalWrite(motorDerechoSuperior, LOW);

    delay(500);

    digitalWrite(motorIzquierdoSuperior, HIGH);
    digitalWrite(motorDerechoSuperior, HIGH);

    digitalWrite(motorIzquierdoPosterior, LOW);
    digitalWrite(motorDerechoPosterior, LOW);
}

void moverIzquierda()
{
    digitalWrite(motorIzquierdoPosterior, HIGH);
    digitalWrite(motorDerechoSuperior, HIGH);

    digitalWrite(motorIzquierdoSuperior, LOW);
    digitalWrite(motorDerechoPosterior, LOW);

    delay(500);

    digitalWrite(motorIzquierdoSuperior, HIGH);
    digitalWrite(motorDerechoSuperior, HIGH);

    digitalWrite(motorIzquierdoPosterior, LOW);
    digitalWrite(motorDerechoPosterior, LOW);
}

void loop()
{
    
}
