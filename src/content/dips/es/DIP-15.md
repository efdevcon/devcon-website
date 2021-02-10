---
Summary: 'A lot of people will travel to DevConVI. This will impose a number of risks to these people:
flight Delays, baggage loss, theft, and others. We will build a decentralized travel insurance for DevConVI participants.'
Github URL: https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-15.md
DIP: 15
Title: Seguro de viaje
Status: Draft
Themes: Travel, Safety
Tags: DeFi, Insurance, Peer2Peer
Authors: christoph@etherisc.com
Resources Required: CustomerSupportBooth at DevConVI
Discussion: https://forum.devcon.org/t/dip-15-travel-insurance/176
Created: 2020-11-27
---

## Resumen de la propuesta

Muchas personas viajarán a DevConVI. Esto impondrá una serie de riesgos a estas personas: retrasos de vuelo, pérdida de maletas, robo y otros. Construiremos un seguro de viaje descentralizado para los participantes de DevConVI.

## Resumen

Ofrecemos un seguro de vuelo para los asistentes de DevconVI.

After registering, people select their flight(s) and pay a small premium (about USD 10$-25$) in some stablecoin, e.g. USDC, DAI etc. Via an oracle, the risk of the flight being late is calculated. After landing, the actual delay is determined by a second oracle call and in case of a delay, the payout is calculated and immediately transferred to the customers wallet. We are currently talking to [Team WindingTree](https://windingtree.com) to integrate the insurance in windingtree's travel agency solution. The oracle is provided by [Chainlink](https://chain.link). The core business process runs on our "[Generic Insurance Framework](https://github.com/etherisc/GIF)" and does not necessarily need any off-chain components, which are, however, provided for convenience.

Exploraremos si otros productos de seguros relacionados con viajes pueden ser implementados de manera similar. . pérdida de maldito, robo y otros, dependiendo de la disponibilidad de datos de pérdida confiables.

Las reclamaciones son pagadas a través de los grupos de riesgo. Los inversionistas pueden proporcionar liquidez para las piscinas de riesgo. Los proveedores de liquidez reciben aquellas primas que no se utilizan para pagar reclamos. To become a liquidity provider, investors need to stake [DIP (Decentralized Insurance Protocol) tokens](https://etherscan.io/token/0xc719d010b63e5bbf2c0551872cd5316ed26acd83).

El modelo económico junto con el modelo de apuestas, será probado en el Q1/2021.

## Motivación & Racionalidad

Los asistentes se sentirán tranquilos cuando viajen a DevConVI. Esto aumentará su bienestar y también atraerá a la gente que de lo contrario se abstendría de participar. Es muy probable que los asistentes de DevConVI estén dispuestos a usar un seguro basado en blockchain porque se ajusta a mejor en su compromiso DeFi. Los pagos pueden ser inmediatos y no se necesita papeleo. While we have offered FlightDelay Insurance at DevConII in Shanghai and got a lot of good feedback, we believe that a full featured travel insurance would be even more attractive for Devcon VI attendees. The connection with WindingTree will further improve the user experience because travellers can buy flight tickets, hotel and other services and pay in a single transaction.

## Implementación

FlightDelay Insurance ha estado en vivo en DevConII y DevConIII. Se implementará usando nuestro [Marco de Seguro Genérico](https://github.com/etherisc/GIF) y vivirá en el mainnet de Ethereum.

## Requisitos operacionales & Propiedad

La implementación y operación serán proporcionadas por Etherisc. Estamos hablando con [el autor DIP-3 WindingTree](https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-3.md) para integrarse en su agencia de viajes.

## Enlaces & Información adicional

- https://etherisc.com
- https://github.com/etherisc/GIF
- https://windingtree.com
- https://github.com/windingtree
- https://chain.link
- [Blog que describe la Integración de Chainlink de las Oráculas de FlightDelay](https://blog.etherisc.com/etherisc-to-leverage-chainlink-oracles-for-decentralized-flight-insurance-product-9559b64d79c7)
