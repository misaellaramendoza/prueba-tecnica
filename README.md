# Prueba técnica – React Native Developer

Este repositorio contiene una app base para evaluar habilidades de mantenimiento y desarrollo evolutivo en React Native.

## Stack base
- Expo
- React Native
- TypeScript
- Redux Toolkit
- React Navigation

## Objetivo
Trabajar sobre una app existente para completar funcionalidades, corregir errores y documentar la solución.

## Requerimientos
1. Consumir correctamente los datos y mostrar el listado.
2. Implementar manejo de `loading`, `error`, `empty state` y `pull to refresh`.
3. Mantener el estado global con Redux Toolkit o equivalente.
4. Agregar al menos una mejora funcional, por ejemplo:
   - filtro por prioridad,
   - búsqueda,
   - favoritos,
   - persistencia local,
   - edición simple.
5. Corregir los bugs detectados en la app base.
6. Documentar en este README:
   - cómo ejecutar el proyecto,
   - qué corregiste,
   - qué mejoras agregaste,
   - qué harías diferente para producción.

## Pistas
La app incluye intencionalmente algunos problemas para revisar el criterio técnico del candidato.

## Entregables esperados
- Repositorio con la solución.
- Commits claros.
- README actualizado.

## Criterios de evaluación
- Calidad y claridad del código.
- Manejo de asincronía y estado.
- Resolución de bugs.
- UX básica móvil.
- Organización del repositorio.
- Capacidad para explicar decisiones técnicas.

## 🚀 Instalación

```bash
npm install
npx expo start


 ##  🐛 Bugs detectados

 - [x] La lista principal renderizaba un elemento duplicado debido a que el servicio fetchTickets retornaba manualmente un ticket repetido.

 - [x] El efecto useEffect se ejecutaba múltiples veces provocando múltiples llamadas al API.

 - [x] La lista utilizaba un keyExtractor basado en el índice, generando inconsistencias en el render.

## 🔧 Correcciones realizadas

- Se corrigió la duplicación de elementos en la lista eliminando un retorno incorrecto en el mock del servicio (fetchTickets), el cual agregaba un elemento duplicado manualmente.

- Se corrigió la ejecución repetida del useEffect en TicketListScreen, eliminando dependencias innecesarias para evitar múltiples llamadas al API.

- Se corrigió el keyExtractor de la lista para utilizar un identificador único (id) en lugar del índice, evitando problemas de renderizado en FlatList.

- Se mejoró el thunk loadTickets en ticketsSlice utilizando rejectWithValue para manejar errores de forma controlada y permitir propagar mensajes personalizados desde el servicio.

- Se ajustó el reducer en el caso rejected para utilizar el error proveniente del thunk en lugar de un mensaje genérico, mejorando la trazabilidad de errores.

## 📡 Consumo de datos

Se validó el consumo correcto de datos desde el servicio de tickets, asegurando:

- Eliminación de datos duplicados en la respuesta.

- Ejecución única del fetch al montar la pantalla (TicketListScreen).

- Render correcto de la lista mediante identificadores únicos.

- Manejo adecuado de estados: loading, error y empty state.

## ✨ Mejoras implementadas

- Se agregó una funcionalidad de búsqueda en tiempo real que permite filtrar tickets por título y descripción.

- La búsqueda se integra con el filtro por estado, permitiendo combinar ambos criterios.

## 🧠 Observaciones

- El estado vacío funciona correctamente, pero la UI puede mejorarse para ofrecer una mejor experiencia de usuario (por ejemplo, ilustraciones o acciones sugeridas).

- Los textos en la UI están mezclados entre inglés y español, lo que puede generar confusión. Se recomienda implementar internacionalización (i18n) para producción.

## 🚀 Qué haría diferente para producción

- Implementaría manejo de errores más robusto, incluyendo diferentes tipos de error (red, servidor, timeout) y mensajes más claros para el usuario.

- Agregaría un sistema de retry automático o manual (botón de “Reintentar”) en caso de fallo en la carga de datos.

- Mejoraría la experiencia del usuario en estados vacíos y de carga mediante componentes visuales más atractivos (skeleton loaders, ilustraciones, etc.).

- Implementaría debounce en la búsqueda para evitar renders innecesarios y mejorar el rendimiento.

- Centralizaría los textos de la aplicación utilizando internacionalización (i18n) para soportar múltiples idiomas.

- Agregaría pruebas unitarias y de integración (por ejemplo con Jest y React Native Testing Library).

- Separaría mejor la capa de servicios para facilitar escalabilidad y testing.

- Implementaría persistencia local (por ejemplo con AsyncStorage) para cachear datos y mejorar la experiencia offline.
