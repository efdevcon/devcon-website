---
Summary: 'Addition to CO2ken"s [DIP–1](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-1.md) clarifying the collection and allocation of offsetting contributions through a DAO which gives contributors the possibility to vote for the offset projects they want to support.'
Github URL: https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-12.md
DIP: 12
Title: Addition to DIP–1 — Make Devcon Carbon Neutral
Status: Draft
Themes: Ticketing, Environmental Sustainability
Tags: Event production, Software
Authors: Raphaël Haupt <raphael@curvelabs.eu>
Resources Required: Tech support, Communication support
Discussion: https://forum.devcon.org/t/co2ken-carbon-neutral-devcon/27
Requires: DIP-1
Created: 2020-10-22
---

## Resumen de la propuesta
Adición al [DIP–1](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-1.md) de CO2ken aclarando la recolección y asignación de contribuciones compensatorias a través de un DAO que da a los contribuyentes la posibilidad de votar por los proyectos compensatorios que quieren apoyar.

## Resumen
Como se describe en [DIP–1](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-1.md), queremos ofrecer a los asistentes la capacidad de compensar las emisiones de carbono de Devcon. En el primer DIP explicamos la racional general detrás de la propuesta y dejamos algunos detalles abiertos a una mayor clarificación. This DIP aims to answer the following question which was raised in the first DIP: *How the funds gathered during the ticketing process will be used to offset the event's carbon footprint will be discussed in a future DIP?*

En resumen, desplegaremos un DAO que contiene las contribuciones para compensar los proyectos recolectados durante el proceso de ticketing hasta que Devcon tenga lugar en agosto de 2021. Además, La DAO dará a los colaboradores la posibilidad de votar por los proyectos de carbono que favorecen, participando activamente en la forma en que se asignan los fondos recaudados.

*How does voting affect the projects?* There will a pre-selection of projects that contributors can vote on. La asignación de contribuciones no seguirá un enfoque del ganador, sino que será relativo a los votos totales, i. Si un proyecto recibió el 60% de los votos, obtendrá el 60% de los fondos. Los colaboradores podrán votar a favor de múltiples proyectos indicando así cómo piensan que los fondos deben dividirse entre los proyectos.

*What if only 50% of the people vote?* Whether or not a person votes, their funds are going to carbon projects. Si la gente no vota, asumimos una distribución equitativa de votos entre los proyectos propuestos. De esta forma, nos aseguramos de que el peso de un voto no sea excesivo en caso de baja participación.

## Motivación & Racionalidad
Las DAO están saliendo de la Ether como setas tratando de abordar los desafíos de la coordinación humana como la asignación de fondos, la colaboración o la gobernanza descentralizada. Estamos eligiendo este camino para la recaudación y asignación de las contribuciones compensatorias porque queremos quitar la compensación del "rincón de la caridad" e integrar a los colaboradores en el proceso tanto como sea posible y porque nos da tiempo hasta el evento para encontrar y involucrar los mejores proyectos de carbono.


## Implementación
**Organizacional**

- Los colaboradores recibirán un NFT que les da acceso al DAO. Estamos discutiendo la mejor manera de dar a los contribuyentes este NFT con el menor riesgo posible para la privacidad de datos. Una integración con la tarjeta de estado [](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-5.md) o cualquier sistema de ticketing en cadena (como el propuesto por [Alpha Wallet en DIP–6](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-6.md)) podría ser una buena solución.
- Encuentre proyectos de carbono de alta calidad que se añadirán como receptores de las contribuciones recaudadas.
- Identificar el mejor flujo que asegura que los proyectos de carbono reciban los fondos en una moneda que sepan usar

**Técnico**

- Revise la función de complemento de antes de Tix y, si es satisfactorio, añada CO2ken como elemento de swag.
- Los usuarios pueden pagar con las mismas monedas que las aceptadas por el proceso de compra de Devcon.
- Añadir un módulo de votación que permita a los colaboradores expresar sus preferencias para proyectos específicos de carbono. Este módulo de votación probablemente utilice el voto de convicción desarrollado por la [Pila de Commons](https://commonsstack.org/) e implementado por [1Hive](https://1hive.org/#/).

**Experiencia anterior**

- Ya hemos implementado un DAO de PoC durante la [incubadora BSIC](https://blockchainforsocialimpact.com/incubator-winners-2020/) que puedes echar un vistazo [aquí](http://dao.co2ken.io/).
- At Curve Labs (broader CO2ken family), we are building *PrimeDAO* which you can learn more about [here](https://liquiddao.eth.link/#/).

**Post-evento**

- Será muy valioso para nosotros ver el compromiso de los contribuyentes con el tema de la compensación del carbono.
- Nos esforzamos por descentralizar la gobernanza del protocolo CO2ken. Este DAO será un primer grupo de usuarios alineados con valor.

## Requisitos operacionales & Propiedad
1. *What actions are required to implement the proposal at Devcon?*
    - Necesitaremos el equipo de Devcon para convertir las contribuciones de fiat a crypto y enviarlas al DAO.
    - Los colaboradores necesitan recibir el NFT que les otorga derechos de voto en el DAO. El enfoque basado en la verificación propuesto por [Alpha Wallet en DIP–6](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-6.md) podría ser una buena opción que permite a los contribuyentes reclamar su NFT.
    - Necesitaremos las direcciones de correo electrónico de aquellos que contribuyeron a explicar el proceso de votación y sus derechos de participación en el DAO.
    - Necesitaremos un stand en Devcon durante toda la duración del evento a
        - presentar los diferentes proyectos (tal vez incluso conseguir desarrolladores de proyectos allí en persona) y dar a los colaboradores una oportunidad de involucrarse directamente con la DAO;
        - sensibilizar sobre los desafíos ambientales en el espacio criptográfico y sobre las formas de abordarlos. La [Iniciativa de la Naturaleza Soberana](http://sovereignnature.com/) nos apoyará en ese frente.

2. *Who will be responsible for the proposal to be implemented effectively? (i.e. working on Day 0)*
    - CO2ken será responsable de la exitosa aplicación de esta propuesta.
3. *¿Con qué otros proyectos se podría integrar esta propuesta? (Puntos de bonus para la colaboración entre equipos :))*
    - vea [original DIP–1](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-1.md).

## Enlaces & Información adicional

**Enlaces:**
* [Enlace al Foro de Devon — CO2ken DIP](https://forum.devcon.org/t/co2ken-carbon-neutral-devcon/27)
* [Sitio web de CO2ken](https://www.co2ken.io/)
* [Publicación media que describe el Génesis del proyecto (las cosas han cambiado desde entonces)](https://medium.com/curve-labs/co2ken-genesis-74d7a1387ea1)
* [@CO2ken_io en Twitter](https://twitter.com/CO2ken_io)
