---
title: Especificaciones
pages:
  - raffle-auction
---
### Seguridad

* Los contratos inteligentes para la subasta y la rifa se pueden ver [aquí](https://github.com/TrueFiEng/devcon-raffle).
* Los contratos fueron auditados por Trail of Bits y el informe de auditoría se puede ver [aquí](https://drive.google.com/file/d/1I3A0Kf-CrPdFRjZaZ8lOvbfN49moyki2/view?usp=sharing)

### Aleatoriedad

El contrato utiliza una serie de números aleatorios para elegir a los ganadores de la rifa. Como no hay un generador seguro de números aleatorios en Arbitrum, esos números se proporcionarán al contrato en una transacción después de que cierre la ventana de licitación. Se utilizarán hashes de 10 futuros bloques de la red principal de Ethereum como fuente de aleatoriedad, y cada uno de ellos atraerá a 8 ganadores de la rifa, por lo tanto, 80 en total. Para evitar que los mineros manipulen los bloques con el fin de sacar provecho del concurso, agregaremos sal a los hashes con un número secreto **S**. Esto significa que para los números aleatorios usaremos los hashes de bloques y el número **S**:

**número_aleatorio_1 = keccak256(block_hash_1, S)**

**número_aleatorio_2 = keccak256(block_hash_2, S)**

…

Por motivos de transparencia, nos comprometemos a utilizar un número secreto **S** cuyo hash equivale a:
**keccak256(S) = 28902c742fcf74d7f6edce7c692e2be7e8c4befb8ec14a86e0422b24f714b01c**

Después de que se liquide el sorteo, revelaremos el número secreto **S** para que cualquiera pueda verificar que los números aleatorios no fueron manipulados. Los siguientes bloques de la red principal de Ethereum se utilizarán como fuente de aleatoriedad: 

*15138000
15138001
15138002
15138003
15138004
15138005
15138006
15138007
15138008
15138009*



Lea los Términos y condiciones de la subasta y la rifa antes de participar [aquí](https://docs.google.com/document/d/1pVU-G8mpPD33EwOwE96MTB_4AZrYa2TNWXLSfkOPCJQ/edit?usp=sharing).