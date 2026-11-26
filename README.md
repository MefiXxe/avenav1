# Actualización del nombre a Quinua Crunch

Lee ACTUALIZAR_GITHUB.txt para actualizar el repositorio existente. Esta actualización conserva config.js, las imágenes y los datos personalizados.

# Quinua Crunch

Web de barritas de cereal con portada de sabores, iconos, paleta por producto, reproducción automática y configurador aparte.

## Empezar

1. Abre GUIA_GITHUB.html. Explica cómo revisar la web y publicarla gratis desde cero.
2. Sube el contenido de esta carpeta a la raíz de un repositorio GitHub.
3. Conecta el repositorio con Cloudflare Pages: main, framework None, comando exit 0, salida /.
4. Cloudflare te entregará el enlace público.
5. Abre ese enlace seguido de /admin.html para personalizar la web.

No requiere instalar Node, React ni una base de datos. HTML, CSS y JavaScript nativo con rutas relativas. Para revisar localmente puedes abrir index.html; para todas las funciones de exportación del panel, usa la versión alojada.

## Configurador

- Marca y portada: nombre, logo, paleta global, transiciones, avance automático o manual y segundos entre sabores.
- Productos: nombre, títulos, descripción, imagen recortada, fotografía completa, escala, fondo, color de texto, color de detalles, icono, etiquetas, precio, orden y visibilidad.
- Contacto: WhatsApp y textos.
- Quiénes somos: historia y pie de página.
- Publicar: exportar config.js, ZIP completo y respaldos.

El panel guarda borradores solo en ese navegador. Para publicar, descarga config.js, reemplázalo en GitHub y confirma el cambio. Cloudflare desplegará esa actualización. Los archivos subidos mediante el panel se optimizan e incluyen en config.js.

El panel no aparece en la navegación pública y no escribe al servidor. No incluye una contraseña ficticia. Solo tu acceso al repositorio permite publicar. No almacenes datos privados en config.js.

## Carrusel

Tres sabores iniciales: Quinua tradicional, Chocolate y Avena. Avanza cada 6 segundos de manera predeterminada. No hay botón público de pausa o reproducción. Continúa aunque el puntero esté sobre la portada. Se detiene temporalmente durante un gesto, al abrir un detalle o fotografía, al ocultarse la pestaña o al salir de la portada. Respeta la preferencia de movimiento reducido al iniciar.

Las escalas diferentes de las imágenes compensan sus proporciones y márgenes para que los empaques tengan una anchura visual parecida. Los colores, iconos y escalas son editables. Los recortes proceden de las imágenes que proporcionó el usuario.

El WhatsApp está vacío hasta que configures tu número. No se añadieron cifras nutricionales. La nueva referencia de color mencionada por el usuario aún está pendiente.

Archivos centrales: index.html, styles.css, app.js, carousel.js, config.js, admin.html, admin.js, shared.js y assets/.
