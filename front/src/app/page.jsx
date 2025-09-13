import "./globals.css";
export default function HomePage() {
  return (
    <div className="grid place-items-center py-15 min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-center mt-10">
          Guia para modear juegos
        </h1>
      </div>
      <div className="max-w-3/4 mx-auto bg-gray-800 rounded-lg border-t-4 border-blue-500 mt-10 mb-10">
        <p className="text-justify text-2xl mt-5 p-5">
          Bienvenido a la guia de modding de César, aqui encontraras guias
          basicas para modear juegos en los que tengo experiencia como Skyrim,
          Fallout, Resident Evil y mas. No soy un experto en la materia pero te
          enseñaré los primeros pasos para modear tus juegos favoritos. Me
          enfocare en dar ejemplos claros y concisos para que puedas seguirlos
          facilmente, esta pagina esta principalmente enfocada al modding de
          juegos en PC, para aquellas personas que son principiantes. Para
          modificar los juegos nos apoyaremos principalmente en la pagina de
          Nexus Mods, la cual es una donde se puede encontrar la mayor parte de
          la comunidad de modding.
        </p>
      </div>
      <div className="max-w-3/4 mx-auto bg-gray-800 rounded-lg border-t-4 border-blue-500 mb-10">
        <table>
          <thead className="border-b-2 border-gray-300">
            <tr>
              <th className="p-5 w-1/3 text-xl">Juego</th>
              <th className="p-5 text-xl">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-5 w-1/3 items-center">
                <img
                  src="https://s.isanook.com/ga/0/ud/194/974203/01.jpg"
                  alt="Skyrim"
                  className="w-full h-auto"
                />
              </td>
              <td className="p-5">
                <div className="text-center text-3xl mb-8">
                  The Elder Scrolls V: Skyrim
                </div>
                <div className="text-justify text-xl mb-5">
                  Skyrim es un juego de rol y acción en mundo abierto
                  desarrollado por Bethesda Game Studios. Ambientado en la vasta
                  y fantástica provincia de Skyrim, el jugador asume el papel
                  del Sangre de Dragón, un héroe profetizado con el poder de
                  derrotar dragones. El juego destaca por su libertad de
                  exploración, personalización de personajes, misiones épicas y
                  una rica historia llena de magia, criaturas míticas y
                  facciones en conflicto. Skyrim es reconocido por su atmósfera
                  inmersiva y la posibilidad de modificarlo con miles de mods
                  creados por la comunidad.
                </div>
                <div className="flex justify-left">
                  <a
                    href="/dashboard/gamesPages/skyrim"
                    className="bg-blue-600 text-amber-50 font-bold cursor-pointer hover:bg-blue-700 px-6 py-2 rounded-md mt-5 text-center"
                  >
                    Ver guia
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-5 w-1/3 items-center">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg"
                  alt="Fallout 4"
                  className="w-full h-auto"
                />
              </td>
              <td className="p-5">
                <div className="text-center text-3xl mb-8">Fallout 4</div>
                <div className="text-justify text-xl mb-5">
                  Fallout 4 es un juego de rol y acción postapocalíptico
                  desarrollado por Bethesda. Ambientado en un mundo devastado
                  por la guerra nuclear, el jugador explora el Yermo de Boston,
                  construye asentamientos, personaliza armas y armaduras, y toma
                  decisiones que afectan la historia. Es famoso por su gran
                  comunidad de modding, que permite añadir contenido, mejorar
                  gráficos y modificar la jugabilidad de muchas formas.
                </div>
                <div className="flex justify-left">
                  <a
                    href="/dashboard/gamesPages/fallout4"
                    className="bg-blue-600 text-amber-50 font-bold cursor-pointer hover:bg-blue-700 px-6 py-2 rounded-md mt-5 text-center"
                  >
                    Ver guia
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-5 w-1/3 items-center">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/steam/apps/22380/header.jpg"
                  alt="Fallout New Vegas"
                  className="w-full h-auto"
                />
              </td>
              <td className="p-5">
                <div className="text-center text-3xl mb-8">
                  Fallout: New Vegas
                </div>
                <div className="text-justify text-xl mb-5">
                  Fallout: New Vegas es un juego de rol y acción desarrollado
                  por Obsidian Entertainment. Situado en el desierto de Mojave,
                  el jugador se ve envuelto en una lucha de poder entre
                  facciones rivales. Es conocido por su narrativa ramificada,
                  libertad de elección y una de las comunidades de modding más
                  activas, que ha creado desde mejoras visuales hasta
                  expansiones completas.
                </div>
                <div className="flex justify-left">
                  <a
                    href="/dashboard/gamesPages/falloutnv"
                    className="bg-blue-600 text-amber-50 font-bold cursor-pointer hover:bg-blue-700 px-6 py-2 rounded-md mt-5 text-center"
                  >
                    Ver guia
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-5 w-1/3 items-center">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/steam/apps/1498570/header.jpg"
                  alt="The King of Fighters XV"
                  className="w-full h-auto"
                />
              </td>
              <td className="p-5">
                <div className="text-center text-3xl mb-8">
                  The King of Fighters XV
                </div>
                <div className="text-justify text-xl mb-5">
                  The King of Fighters XV es la última entrega de la legendaria
                  saga de juegos de lucha desarrollada por SNK. Ofrece combates
                  dinámicos, una amplia variedad de personajes y modos de juego.
                  Aunque el modding es menos común que en juegos de rol, la
                  comunidad ha creado mods para personalizar apariencias y
                  mejorar la experiencia visual y sonora.
                </div>
                <div className="flex justify-left">
                  <a
                    href="/dashboard/gamesPages/kofxv"
                    className="bg-blue-600 text-amber-50 font-bold cursor-pointer hover:bg-blue-700 px-6 py-2 rounded-md mt-5 text-center"
                  >
                    Ver guia
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
