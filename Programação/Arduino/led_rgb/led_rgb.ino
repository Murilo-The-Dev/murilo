const int botao = 2;
const int pinR = 9;
const int pinG = 10;
const int pinB = 11;

const long LIMITE_TOQUE_LONGO = 2000;
const long PERIODO_PULSO_LENTO = 3000;
const long PERIODO_PULSO_RAPIDO = 500;

const int NUM_CORES = 7;
const int cores[NUM_CORES][3] = {
  {255, 0, 0},
  {255, 255, 0},
  {0, 255, 0},
  {0, 255, 255},
  {0, 0, 255},
  {255, 0, 255},
  {255, 255, 255}
};

int indiceCor = 0;
int modo = 1;

bool estadoAnterior = HIGH;
unsigned long tempoPressionado = 0;
bool pressionando = false;
bool acaoLongaExecutada = false;

void setColor(float escala) {
  int r = cores[indiceCor][0] * escala;
  int g = cores[indiceCor][1] * escala;
  int b = cores[indiceCor][2] * escala;
  analogWrite(pinR, r);
  analogWrite(pinG, g);
  analogWrite(pinB, b);
}

void setup() {
  pinMode(botao, INPUT_PULLUP);
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);
}

void loop() {
  bool estadoAtual = digitalRead(botao);
  unsigned long agora = millis();

  if (estadoAnterior == HIGH && estadoAtual == LOW) {
    pressionando = true;
    tempoPressionado = agora;
    acaoLongaExecutada = false;
  }

  if (pressionando && estadoAtual == LOW && !acaoLongaExecutada) {
    if (agora - tempoPressionado >= LIMITE_TOQUE_LONGO) {
      indiceCor = (indiceCor + 1) % NUM_CORES;
      modo = 1;
      acaoLongaExecutada = true;
    }
  }

  if (estadoAnterior == LOW && estadoAtual == HIGH) {
    if (pressionando && !acaoLongaExecutada) {
      modo = (modo % 3) + 1;
    }
    pressionando = false;
  }

  estadoAnterior = estadoAtual;

  switch (modo) {
    case 1:
      setColor(1.0);
      break;
    case 2: {
      float fase = (agora % PERIODO_PULSO_LENTO) / (float)PERIODO_PULSO_LENTO;
      float escala = (sin(fase * 2 * PI) + 1.0) / 2.0;
      setColor(escala);
      break;
    }
    case 3: {
      float fase = (agora % PERIODO_PULSO_RAPIDO) / (float)PERIODO_PULSO_RAPIDO;
      float escala = (sin(fase * 2 * PI) + 1.0) / 2.0;
      setColor(escala);
      break;
    }
  }
}