---
Summary: 'Give Devcon participants a taste of a regenerative economy, by allowing them to offset the carbon emissions associated with the event, as part of the ticketing process.'
Github URL: https://github.com/efdevcon/DIPs/blob/master/DIPs/DIP-1.md
DIP: 1
Title: Make Devcon carbon neutral
Status: Accepted
Themes: Ticketing, Environmental Sustainability
Tags: Event production, Software
Authors: Raphaël Haupt <raphael@curvelabs.eu>
Resources Required: Tech support, Communication support
Discussion: https://forum.devcon.org/t/co2ken-carbon-neutral-devcon/27
Created: 2020-07-20
---

## Resumen de la propuesta
Dar a los participantes de Devcon un sabor a una economía regenerativa. permitiéndoles compensar las emisiones de carbono asociadas al evento, como parte del proceso de facturación.

## Resumen
Queremos ofrecer a los asistentes la capacidad de compensar las emisiones de carbono de Devcon. Esto incluye tanto **emisiones directas** que ocurren durante el evento: uso de energía, aire acondicionado, alimentos, etc. así como **emisiones indirectas** que están estrechamente acopladas a ella—lo que es más importante, alojamiento y vuelos.

Hemos identificado dos maneras de acercarse a la compensación, cada una con sus propias ventajas y desventajas.  Te describiremos estas opciones, y [comprometeremos a la comunidad](https://forum.devcon.org/t/co2ken-carbon-neutral-devcon/27) para encontrar la opción más adecuada.

El usuario podrá pagar directamente dentro del proceso de ticketing. Las contribuciones compensatorias están destinadas a proyectos locales de carbono de la más alta calidad en nuestro país anfitrión de Colombia.

## Motivación & Racionalidad
La mayoría de nosotros trabajando en Ethereum estamos obsesionados con construir un "futuro mejor", y aunque todos estamos centrados en diferentes bloques de construcción, entendemos que un cambio radical solo es posible si combinamos estos bloques en un sistema global, interconectado, social y económico.

Creemos que cualquier nuevo sistema debe aprender de las deficiencias de los sistemas anteriores y esforzarse por ser regenerativo, pensar en el futuro, teniendo en mente los mejores intereses de las generaciones futuras. Internacionalizar el coste de cualquier impacto social y medioambiental negativo equivale a lograrlo.

Devcon es donde descubrimos, conectamos y sincronizamos con el ecosistema global y donde sentamos las bases para futuras colaboraciones, y como tal desempeña un papel esencial en este nuevo sistema. Vemos esto como una oportunidad para que Devcon lidere con el ejemplo tomando medidas para minimizar su impacto negativo en el mundo natural, y al hacerlo, tenemos la oportunidad de incitar a los participantes a reflexionar sobre sus propias acciones. y no sólo imaginar un futuro mejor, pero para actuar inmediatamente y ser parte de esa visión internalizando una externalidad relativamente bien entendida: las emisiones de carbono asociadas con su participación en Devcon. También esperamos que esto incite a los participantes a generar valor sobre el potencial de un ecosistema tan equilibrado.

```
Estimas estimaciones de emisiones para 3500 asistentes y 4 días:
→ Emisiones directas = 150 t
→ Alojamiento = 280 t
→ Transporte = 1350 t

Precio de compensación de carbono de alta calidad por tonelada:
→ 10 – 20 USD
```


## Implementación
**Organizacional**

- La forma en que los fondos recaudados durante el proceso de facturación serán utilizados para compensar la huella de carbono del evento será discutida en un futuro DIP. Este DIP debería describir la gobernanza y la asignación de los fondos y podría desarrollarse en colaboración con otros proyectos como [Terra0](https://terra0.org/) o la [Iniciativa Naturaleza Soberana](http://sovereignnature.com/). ¡Se animan las entradas de la comunidad!
- Recopilar datos para estimar mejor la huella de carbono del evento.

**Técnico**

- Construye una integración fácil de usar en el proceso de ticketing de Devcon.
- Los usuarios pueden pagar con las mismas monedas que las aceptadas por el proceso de compra de Devcon.

**Experiencia anterior**

- Será la primera vez que integremos la compensación de carbono en el proceso de toma de decisiones de un evento.
- Ya tenemos un PoC en ejecución que puedes echar un vistazo [aquí](https://www.co2ken.io/).

**Post-evento**

- Será muy valioso para nosotros descubrir el apetito compensador de la comunidad Ethereum, así como ver cómo la gente y otros proyectos están utilizando nuestro producto.
- Los datos que recopilamos en Devcon 2021 también nos ayudarán a hacer predicciones más precisas sobre la huella de carbono de Devcon 2022 y otros eventos. ¡Mejoremos la precisión de los datos cuando sea posible!

## Requisitos operacionales & Propiedad
1. *What actions are required to implement the proposal at Devcon?*
    - The only effort that is needed at Devcon would be including of any bracelet or swag at checkin. All other efforts are focused on the booking process integration.

2. *Who will be responsible for the proposal to be implemented effectively? (i.e. working on Day 0)*
    - CO2ken will be responsible for the successful implementation of this proposal.

3. *What other projects could this proposal be integrated with? (Bonus points for collaboration across teams :))*
    - Anyone who offsets their emissions will receive an NFT representing their contribution.
    - We would love to see other teams pick this up to create positive reinforcement, e.g. participants with the NFT get special swag, discounts, etc.
    - We will actively approach other projects where we see fun ways to collaborate as more DIPs appear.
    - We don't want to punish those who decided against (or simply missed the option to) offsetting their carbon footprint. But we want to reward those who did. Creating value around positive behavior is a simple, yet powerful way to change today's economics—carrots, not sticks!

## Enlaces & Información adicional
**Preguntas que a menudo recibimos y posibles respuestas:**

- *But we don't have the data to accurately calculate the carbon footprint of `X` ?*

    Unfortunately today, most things fall into the  **`X`** category where we would need more data to fully understand the climate impact of a certain action. But this data is often not measured, siloed or private.  We believe developing systems that can collect and aggregate carbon footprint data are amongst the most important things to focus on right now.

    But the lack of accurate data should not be used as an excuse for not starting to act in the first place. Let's not forget: we’re dealing with CO2 emissions. If we use the data we have, take the most conservative estimate, and start offsetting these emissions, we will at worst offset too much. Given the state of the planet, we need to do this anyway.

- *Aren't carbon offsets the new letters of indulgence?*

    We want to make it clear that offsetting is no silver bullet. Studies estimate that three quarters of circulating carbon credits are “hot air” and don’t lead to additional emission reductions. We should foremost aim to reduce our carbon footprint overall, and only compensate for those activities for which no good alternatives exist today.

    This is why a lot of research has to go into sourcing the right projects. Ultimately, our goal at CO2ken is to shed light into the opaque carbon offset value chain in order to unlock the rapid growth we need to see in climate finance.


**Enlaces:**
* [Link to Devon Forum — CO2ken DIP](https://forum.devcon.org/t/co2ken-carbon-neutral-devcon/27)
* [CO2ken Website](https://www.co2ken.io/)
* [Medium post describing the project's Genesis (things have changed since then)](https://medium.com/curve-labs/co2ken-genesis-74d7a1387ea1)
* [@CO2ken_io on Twitter](https://twitter.com/CO2ken_io)
