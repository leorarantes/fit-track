# 📱 Configuração do Ambiente de Desenvolvimento

---

## ✅ Requisitos

Antes de mais nada, certifique-se de ter instalado:

- 🐧 **Sistema Operacional**: Linux (ou WSL)
- 🔧 **Node.js**
- 📦 **npm**
- ☕ **Java JDK** (versão **17 a 20**)
- 🧰 **Android Studio**
- 📱 **Android SDK**

---

## 🔍 Verificando os PATHs

Após a instalação de todas essas tecnologias, será necessário verificar quais os PATHs do Java Jdk e do Android Sdk:

### Para verificar qual é o PATH do Java JDK, execute:
```bash
readlink -f $(which java) | sed 's:/bin/java::'
```

### Para verificar qual é o PATH do Android SDK, execute:
```bash
readlink -f $(which adb) | sed 's:/platform-tools/adb::'
```

## 🌎 Definindo variáveis de ambiente

Após essas verificações, será necessário criar - ou alterar, caso já existam - as variáveis globais **JAVA_HOME** e **ANDROID_HOME**, atribuindo-lhes os valores dos PATHs do Java JDK e do Android SDK, respectivamente.

Depois, no mesmo terminal que utilizou para criar (ou alterar) as variáveis, execute:

```bash
source ~/.bashrc # ou ~/.zshrc
```

## 🧹 Limpando o cache do Gradle

Depois de criar as variáveis, vá até o subdiretório *app/android* (do projeto) e execute:

```bash
rm -rf ~/.gradle && ./gradlew clean
```

#  🚀 Executando o projeto
Abra o Android Studio e dê play no emulador desejado. Depois, em 2 terminais diferentes, execute (nessa ordem):

Terminal 1
```bash
npm start
```

Terminal 2
```bash
npm run android
```