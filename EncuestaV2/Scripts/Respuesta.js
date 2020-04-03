window.onload = function Sola() {
    //Encuesta.Preguntas2.GetPreguntas();
    //Encuesta.Preguntas2.moverDerecha(0);
    //Encuesta.Preguntas2.tiempo();
    //window.preventDefault();

}
function Respuesta() {

    var AConocimiento = [];
    var Califi = [];
    var Fech = [];
    var contA = [{ name: 'fecha1', data: Califi }, { name: 'fecha2', data: Califi },];
    var array2 = {
        name: 'Tokyo',
        data: Califi
    };

    jsonseries = [];
    jsonDescripcion = [];
    this.GetRespuestas = function () {
        
        var IdUsuario = $('#IdUsuario').val();
        var IdEncuesta = $('#IdEncuesta').val();
        try {
            var data = {
                url: '/Encuesta/ObtenerCalificacion?IdUsuario=' + IdUsuario + '&IdEncuesta=' + IdEncuesta, 
                type: 'GET',
                data: '',
                callback: Encuesta.Respuesta.RespuestasGetRespuesta
            }
            Encuesta.Respuesta.CargaDatosCors(data);
        } catch (e) {
            //console.log(e);
        }
    }

    this.RespuestasGetRespuesta = function (response) {
           console.log(response);
        //console.info('el tamaño de esta respuesta es de: '+response.length);
        var html = '';
        
       
        

        //Aquí se recibe el json que trae la BD se itera 2 veces.
        //bulcie i para entrar aa cada fecha
        var ultimoArr = response.jsonResultados.length - 1;
        console.log(response.jsonResultados[ultimoArr]);
        console.log(response.jsonResultados[ultimoArr].length);
        for (var i = 0; i < response.jsonResultados[ultimoArr].length; i++) {
            console.log(response.jsonResultados[ultimoArr][i].Descripcion);
            html += '<div class="contenedorNivel">' +
                '<h2 class="Gold">' + response.jsonResultados[ultimoArr][i].Clave_Certeza2 + '</h2>' +
                '<div class="descripcionNivel">' + response.jsonResultados[ultimoArr][i].Descripcion + '</div>' +
                '</div > ';
        }
        for (var i = 0; i <= response.jsonResultados.length - 1; i++) {
            //Creo mi array al cual le voy a pasar los valores
            var arrData = new Array();
            var arrCalificacion = new Array();
            var Descripcion = new Array();
            for (var j = 0; j <= response.jsonResultados[i].length - 1; j++) {
                //Aquí cominezo a recorrer cada objeto que hay en la agrupación (que en este caso son 2)
                //Aquí objeton los valores que necesito y los agregro en el array.
                AConocimiento.push(response.jsonResultados[i][j].Clave_Certeza);
                Descripcion.push(response.jsonResultados[i][j].Clave_Certeza2);
                arrData.push(response.jsonResultados[i][j].Calificacion);
                console.log("calificacion: " + response.jsonResultados[i][j].Calificacion);
                var Descripcion2 = response.jsonResultados[i][j].Descripcion
                //if (Descripcion2 != null) {
                //    html += '<div class="contenedorNivel">' +
                //            '<h2 class="Gold">Nivel'+j +'</h2>' +
                //        '<div class="descripcionNivel">' + response.jsonResultados[i][j].Descripcion +'</div>' +
                //            '</div > ';
                //}
               
            }
            //Creo un objeto local series y le anexo la información que ya recolecté.
            var series = {
                name: response.jsonResultados[i][0].Fecha,
                data: arrData
            };
            var resultados = {
                Fecha: response.jsonResultados[i][0].Fecha,
                Acontesimiento: AConocimiento,
                Descripcion: Descripcion,
                Calificacion:arrData 
            }
            //Añado la información al array global (jsonseries
            jsonseries.push(series);
            jsonDescripcion.push(resultados);
        }
        $('#respuestas').html(html);
        //var descripProsp = response.jsonResultados[0][1];
        //var AreaConocimiento = descripProsp.AreaConocimiento;
        //var Calificacion = descripProsp.Calificacion;

        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tienes muchas dificultades para prospectar debido a que desconoces casi por completo los fundamentos de la prospección. No sabes cómo prospectar y casi nunca lo intentas. Constantemente te las arreglas para seguir vendiendo, tienes una planificación nula de oportunidades porque no tienes oportunidades en tu embudo. Dependes por completo de los prospectos que la empresa te proporciona o de aquellos que el destino tiene para ti día con día. Es debido a este factor que experimentas un elevado nivel de incertidumbre respecto a tus ingresos mensuales</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección bajo</h2>' +
        //        '<div class="descripcionNivel">Tienes una noción básica de como prospectar pero tu nivel de conocimiento es deficiente, lo que provoca un elevado nivel de incertidumbre respecto a esta actividad. La incertidumbre tiene como resultado inacción, sabes que tienes que prospectar pero no estas seguro de por dónde empezar, de manera que evitas esta actividad a toda costa únicamente llevándola a cabo cuando es absolutamente necesaria o cuando alguien te obliga a hacerlo</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección medio</h2>' +
        //        '<div class="descripcionNivel">Tienes buenas noción sobre cómo prospectar, pero no tienes certeza total sobre el tema, lo que disminuye tu nivel de confianza. Esto provoca que trabajes por intervalos; con un elevado nivel de prospección por rachas, para luego dejar de hacerlo por largos periodos de tiempo. Este es el inicio de la montaña rusa de ingresos que experimentas mes con mes</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes los mecanismos de la prospección y disfrutas de sus beneficios, eres capaz de prospectar y obtener excelentes resultados, tu nivel de certeza en este tema es elevado, lo que incrementa tu disposición y nivel de confianza para abrir nuevas oportunidades. Tu siguiente nivel de habilidad seria ser capaz de prospectar de forma continua y consistente, lo que te llevaría aun más lejos en tus resultados. El esfuerzo sostenido en esta actividad y su reconocimiento como la actividad principal de tu ciclo de venta, garantizara un elevado nivel de oportunidades, vuelve la prospección tu primer prioridad</div>' +
        //        '</div > ';
        //}
        //var descripRapport = response.jsonResultados[0][2];
        //var AreaConocimiento = descripRapport.AreaConocimiento;
        //var Calificacion = descripRapport.Calificacion;
        ////Rapport
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport muy deficiente.</h2>' +
        //        '<div class="descripcionNivel">Tienes un nivel muy deficiente de empatía con tus prospectos, experimentas dificultades para relacionarte y mantener un conversación amena, esto produce que abordes directamente los ciclos de venta sin construir antes una relación de alta calidad; lo que produce que mal entiendan tus propuestas y que te desesperes con facilidad ante cualquier tipo de adversidad. No tienes disposición para tratar de construir una relación con tus clientes, solo te interesas en venderles o así es como ellos te perciben. Prefieres las ventas transaccionales, aquellas que requieren la menor cantidad de relación posible</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de empatía con los clientes es bajo, esto significa que las conversaciones que sostienes con ellos son superficiales y no te permiten abordar los temas que en verdad le preocupan o interesan a tus prospectos, al ser incapaz de comunicarte con ellos a un nivel más personal siempre estas vendiendo sobre lo que consideras que les interesa. Tus propuestas suelen no estar completamente aterrizaras al interés real de tus prospectos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de mantener un buen nivel de empatía con tus prospectos lo que te permite incrementar el tiempo que los prospectos te otorgan en tus presentaciones de venta, los prospectos pueden conversar con apertura moderada sobre sus preocupaciones y problemas. Tienes la capacidad de cerrar un mayor numero de transacciones debido a que tus propuestas son consideradas valiosas y enfocadas al problema que el prospecto te confío. En este nivel de empatía puedes llegar a sobrepasar los limites con tus prospectos siendo poco asertivo y perdiendo tratos debido al excesivo nivel de confianza y permisividad que generas en un intento por caerles bien</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport ideal</h2>' +
        //        '<div class="descripcionNivel">Creas un elevado nivel de empatía con las personas esto es gracias a que no contradices a la gente, buscas temas en común en los cuales ambos puedan estar interesados y mantienes un ciclo de comunicación bien estructurado. Este nivel de conexión emocional te permite presentar propuestas aterrizadas hacia las problemáticas reales del prospecto y logra que los prospectos te “compren” antes de comprar el producto, lo que te da la capacidad de influir en gran medida en sus desiciones</div>' +
        //        '</div > ';
        //}
        //var descripVenta = response.jsonResultados[0][3];
        //var AreaConocimiento = descripVenta.AreaConocimiento;
        //var Calificacion = descripVenta.Calificacion;
        ////Venta Consultiva
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tu capacidad para entrevistar a tus prospectos y determinar cuales son sus problemáticas actuales y de donde provienen es muy deficiente, no eres capaz de identificar los objetivos a corregir ya que basas tu ciclo de venta en tu producto, en lugar de en las “soluciones” que este proporciona. Tratas a tus prospectos como una categoría de clientes en lugar de cómo un cliente especifico; lo que provoca que vendas cosas que en la mayoría de los casos no les produce verdaderos beneficios creando clientes de una sola compra y una mala reputación</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” bajo</h2>' +
        //        '<div class="descripcionNivel">En algunas ocasiones logras averiguar las problemáticas y objetivos de los prospectos, sin embargo no estas interesado en determinar su origen sino en vender tu producto lo antes posible. Esto produce que prometas cosas que no estas seguro de poder entregar pero que otorgas en un intento por cerrar el ciclo de venta lo antes posible, dejando la carga y responsabilidad a otros departamentos. En resumen tus ciclos de venta “cuestan” dinero</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” medio</h2>' +
        //        '<div class="descripcionNivel">Casi siempre logras identificar las problemáticas y objetivos de tu prospecto, estás interesado en determinar las causas de sus dificultades y en proporcionar soluciones reales a los problemas que identificas , en general eres confiable y ético en tus propuestas y productos. Necesitas afinar tus habilidades para llevarlo a cabo con mayor frecuencia</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” ideal</h2>' +
        //        '<div class="descripcionNivel">Realizas un excelente análisis de las problemáticas y objetivos de tus prospectos, lo que te permite construir una consultoría integral que suele producir muchas más ventas de las esperadas, logras posicionarte a través de un profundo conocimiento de tus prospectos, lo que incrementa su nivel de confianza al punto en que te consultan activamente sobre las desiciones para mejorar su situación y siguen casi al pie de la letra tus recomendaciones. El nivel de comprensión que logras construir con tus prospectos es uno de los principales pilares de tu éxito</div>' +
        //        '</div > ';
        //}
        //var descripDolor = response.jsonResultados[0][4];
        //var AreaConocimiento = descripDolor.AreaConocimiento;
        //var Calificacion = descripDolor.Calificacion;
        ////Dolor del PRospecto
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tienes un incapacidad muy marcada para determinar los puntos de dolor de tus prospectos, lo que te incapacita para mantenerlos interesados en todo momento. Esta situación produce que constantemente te enfrentes con objeciones de precio y de producto. Los prospectos pensaran constantemente que es mas de lo que necesitan o que están pagando por cosas que no requieren, lo que inevitablemente los llevara a pedirte descuentos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu capacidad para determinar los puntos de dolor de tus prospectos es baja pero en ocasiones puedes encontrarlos. Desconoces como están estructurados los niveles de motivos de compra y constantemente tratas de buscar que necesidades tienen tus prospectos lo que produce que tus prospectos si se interesen por tu producto pero que en la mayoría de las ocasiones pospongan las desiciones de compra</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, medio</h2>' +
        //        '<div class="descripcionNivel">Tienes una buena capacidad de determinar los dolores de tus prospectos, te enfocas en que problemas puedes ayudar a resolver y esto incrementa el nivel de urgencia en tus ciclos de venta; lo que te lleva a concretar un mayor numero de transacciones. Un conocimiento más preciso sobre los motivos dominantes de compra de los prospectos te hará mucho más capaz de cerrar ciclos de venta y erradicara por completo las objeciones de precio sobre tus productos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes muy bien cómo identificar los puntos de dolor de tus prospectos, eres capaz de mantenerlos altamente interesados sobre tus presentaciones de venta. Despiertas un elevado nivel de urgencia en tus prospectos lo que hace que vendas más y con mayor velocidad. Al ser capaz de encontrar y resolver los puntos de dolor de tus prospectos erradicas casi por  completo la necesidad de manejar objeciones de precio o de producto, en la mayoría de las ocasiones tus prospectos piensan que tienes exactamente lo que están buscando y están dispuestos a pagar por ello sin objeción alguna</div>' +
        //        '</div > ';
        //}
        //var descripSeg = response.jsonResultados[0][5];
        //var AreaConocimiento = descripSeg.AreaConocimiento;
        //var Calificacion = descripSeg.Calificacion;
        ////Seguimiento
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de seguimiento es nulo, pierdes más del 70% de todos los tratos que trabajas mes con mes por tu incapacidad para mantenerte en contacto con el prospecto y para volver a interesarlo. No tienes un patrón de seguimiento definido y ni siquiera consideras que se requiera. Esta forma de operar te hará perder un elevado numero de prospectos ya que efectivamente llevas a cabo acciones para venderle a tus prospectos, pero de forma muy deficiente, experimentando frustración por “trabajar” pero no cobrar, haciendo que abandones las ventas debido al nivel de frustración</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de seguimiento es muy bajo, pierdes más de la mitad de todos los tratos que inicias debido a esta incapacidad para mantenerte persistente sobre tus prospectos. No cuentas con un patrón de seguimiento y solo contactas de manera casual cada que recuerdas que alguien no te ha respondido. Consideras que una falta de respuesta es una falta de interés y descartas a clientes potenciales a los que tu competencia termina vendiéndoles</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, medio</h2>' +
        //        '<div class="descripcionNivel">Tienes un buen nivel de seguimiento, tratas de contactar en variadas ocasiones a tus prospectos, sin embargo al carecer de una metodología y de un plan sueles cansar a las personas con las que interactúas lo que hace pensar si es correcto o no dar seguimiento. Aunque eres capaz de persistir tu técnica es burda y produce resultados intermitentes</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, ideal</h2>' +
        //        '<div class="descripcionNivel">Conoces bien la importancia del seguimiento y tienes la capacidad de persistir con tus clientes hasta obtener una respuesta. Planificas y estructuras como y cuando los contactaras, te preocupas por tener una estrategia para volver a contactarlos, esta capacidad de seguimiento te pone por encima de tus competidores y compañeros de trabajo ya que cada mes inicias con oportunidades mientras ellos inician en cero</div>' +
        //        '</div > ';
        //}
        //var descripManejo = response.jsonResultados[0][6];
        //var AreaConocimiento = descripManejo.AreaConocimiento;
        //var Calificacion = descripManejo.Calificacion;
        ////Manejo de Objeciones
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No tienes ni idea de como manejar una objeción, probablemente mal entiendes y  confundes todos los términos que tienen que ver con este tema, hasta en un 90% de los casos no sabes que decir ni que hacer frente a las objeciones del prospecto, tienes a evitarlas y a fingir que no las escuchas, aplicas el manejo incorrecto casi en todas las oportunidades que se te presentan y pierdes más del 90% de tus ciclos de venta por quedarte congelado frente a las negativas de tus prospectos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, bajo</h2>' +
        //        '<div class="descripcionNivel">Cuentas con un nivel muy bajo de manejo de objeciones, cuando logras sobreponerte a ellas es meramente por coincidencia o porque el prospecto mismo trabaja la objeción. No sabes diferenciar entre quejas y objeciones, objeciones validas e invalidas, lo que provoca que metas a tus clientes en ciclos interminables de objeciones inventadas, obligándolos a mentir y acabando con tu paciencia cuando te das cuenta de que están inventando razones para no comprarte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, medio</h2>' +
        //        '<div class="descripcionNivel">Intentas superar las objeciones que se te presentan, puedes identificar objeciones durante el ciclo de venta, pero aun no estas seguro de como manejarlas, solo haces tu mejor esfuerzo porque careces de técnica y conocimiento preciso para superarlas. Esto produce ventas que no estas seguro de cómo lograste tornando tus resultados en una cuestión de temporadas y suerte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, ideal</h2>' +
        //        '<div class="descripcionNivel">Puedes identificar con claridad las objeciones que escuchas gracias a tu disposición para encontrarlas, comprendes que las objeciones están ahí para ser encontradas y eliminadas, de manera natural tiendes a manejarlas de forma efectiva, pero serias mucho más capaz de superarlas sí conocieras por completo sus orígenes y mecanismos. Puedes reducir dramáticamente el tiempo que inviertes manejando objeciones al conocer las leyes de cómo se previenen y se superan</div>' +
        //        '</div > ';
        //}
        //var descripCierre = response.jsonResultados[0][7];
        //var AreaConocimiento = descripCierre.AreaConocimiento;
        //var Calificacion = descripCierre.Calificacion;
        ////Cierre de Ventas
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No tienes idea de como cerrar tratos, más del 90% de todos los ciclos de venta que concretas se hubieran concretado incluso si tu no hubieras sido parte de ellos, tus resultados se basan en el porcentaje de cierre natural que hay en tu industria es decir que tu participación es casi nula y el principal factor de compra son las ventajas y atributos de tu producto y no tu nivel de conocimiento o influencia sobre el ciclo de venta</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, bajo</h2>' +
        //        '<div class="descripcionNivel">El algunas ocasiones llegas a cerrar una transacción pero estas completamente inconsciente de que fue exactamente lo que produjo tu cierre. Casi nunca intentas el cierre con tus prospectos a menos que pienses que están muy convencidos de comprar, tu incapacidad para pedir el cierre te mete en ciclos de venta muy largos que tus prospectos terminan posponiendo porque los agotas; dando vueltas en la información del producto en lugar de en el cierre de la operación</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de causar ciclos de cierre pero tu porcentaje esta por debajo del promedio, consideras que intentas el cierro mucho más de lo que en realidad lo haces, evades la zona de cierre porque tu nivel de tolerancia al fracaso no es elevada lo que te vuelve cuidadoso, este nivel de alejamiento de la zona de cierre produce resultados pobres</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, ideal</h2>' +
        //        '<div class="descripcionNivel">Cuentas con un elevado porcentaje de cierre incluso por encima del promedio de tu industria, esto se debe a tu capacidad para pedir el cierre y presionar de forma profesional a tus prospectos y clientes. Construyes suficiente empatía con tus prospectos a través de una elevado nivel de rapport en el inicio del proceso lo que te permite intentar el cierre en múltiples ocasiones sin incomodar a tus prospectos, ya tu numero de intentos de cierre es mayor tu capacidad para concretar ciclos de venta es muy elevada</div>' +
        //        '</div > ';
        //}
        //var descripObten = response.jsonResultados[0][8];
        //var AreaConocimiento = descripObten.AreaConocimiento;
        //var Calificacion = descripObten.Calificacion;
        ////Obtencion de Referidos
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">La obtención de referidos es totalmente nula en tus procesos de venta, si llegas a obtener referidos no es jamás gracias a tu esfuerzo por requerirlos, son completamente efecto de la experiencia positiva que pueda provocar tu producto. Al no considerar qué requieres solicitarlos no cuentas con ningún tipo de proceso para hacerlo. Padeces de escapes de prospectos auto- generados y solo dependes del trafico que tu empresa trae hacia ti</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de obtención de referidos es completamente incidental, rara vez los solicitas por cuenta propia, no te niegas a tomarlos, pero en la mayoría de los casos ni siquiera les das seguimiento. No comprendes que la generación de referidos es tu primera garantía de un proceso de venta de calidad</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, medio</h2>' +
        //        '<div class="descripcionNivel">Consideras que la obtención de referidos es muy importante, pero realmente no lo crees, por lo que los solicitas siempre que no se te olvide. No has experimentado la racha creciente de ventas que pueden producirte los referidos y estas convencido de que si vas a vender tienes que salir a buscar oportunidades en lugar de aprovechar y explotar aquellas en las que ya tuviste éxito y que están completamente dispuestas a apoyarte. Mucha suerte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes la importancia de la obtención de referidos con toda claridad, has experimentado las ganancias que pueden producir un buen numero de referidos y la facilidad con la que pueden ser cerrados en comparación con contactos en frio. Los solicitas activamente, aunque no estas completamente seguro de cual seria el mejor momento o Pitch para hacerlo, un entrenamiento especializado en este tema, te ayudaría a generarlos consistentemente garantizando vender 5 a 6 veces más que tus competidores</div>' +
        //        '</div > ';
        //}
        //var descripProceso = response.jsonResultados[0][9];
        //var AreaConocimiento = descripProceso.AreaConocimiento;
        //var Calificacion = descripProceso.Calificacion;
        ////procesos de ventas
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Desconoces por completo la importancia y uso de un proceso de venta, consideras que solo requieres seguir tu sentido común e imitar a tus compañeros y a otros vendedores, este aprendizaje por experiencia te hereda más errores y malas practicas de las que te imaginas. Te resistes a los procesos de venta incluso cuando son funcionales debido a que consideras que la forma en la que has hecho las cosas funciona de alguna u otra manera, lo que no comprendes es que las ventas que logras concretar no se deben a tu forma de hacer las cosas sino a los porcentajes naturales de venta de tu producto, podrías vender mucho más si estuvieras dispuesto a cambiar tus patrones</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, bajo</h2>' +
        //        '<div class="descripcionNivel">Estas consciente de que los procesos de venta deben de ser seguidos pero no comprendes los “porqués” de muchas de sus fases. Esto produce que dudes constantemente si debes o no seguirlos, lo que te hace muy descuidado en su aplicación y evita que logres ganar certeza en su uso, esto significa que no experimentas éxito por tu falta de disciplina, la cual solo es un reflejo de tu falta de entrenamiento</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de seguir tus procesos de venta, pero lo haces demasiado mecánicamente, ya que los aprendes de forma superficial, siempre estas buscando formulas para lograr aplicar las diferentes etapas del proceso en lugar de ganar una profunda comprensión de cada una de ellas. Esta forma de utilizar tu proceso provoca que pierdas tratos en algunas ocasiones, estas más preocupado por el proceso que por el efecto del proceso en tu prospecto</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes los propósitos de cada una de las fases de tus procesos de ventas y conoces a profundidad la información y objetivos que debes de lograr en cada una de ellas, esto hace que experimentes éxito con la aplicación de tu proceso y permite que te sigas apegando a su uso diario. Conocer mejor el proceso al punto en que puedas aplicarlo de forma dinámica a tus prospectos te hará mucho más efectivo y exitoso</div>' +
        //        '</div > ';
        //}
        //var descripToleran = response.jsonResultados[0][10];
        //var AreaConocimiento = descripToleran.AreaConocimiento;
        //var Calificacion = descripToleran.Calificacion;
        ////Tolerancia al fracaso
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No toleras el fracaso en lo absoluto, incluso experimentas sensaciones orgánicas intensas al encontrarte en situaciones en las que no eres capaz de salirte con la tuya. Tu elevado nivel de temor, te congela eliminando tu nivel de acción, y con ello tus resultados. Estás compulsivamente evitando fallar, en lugar de concentrarte en tener éxito, este nivel tan alto de temor es uno de los principales factores que evita que te consolides como vendedor profesional. Te irritas con facilidad y pierdes el control de tus ciclos de venta debido a tu nivel  de sensibilidad contra cualquiera que vaya en contra de ganar tus comisiones</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de tolerancia al fracaso es sumamente bajo, experimentas incomodidad física y sueles desmotivarte causando que disminuyas tu nivel de actividad por largos periodos de tiempo. Realizas ciclos de venta fuera de tiempo presente tratando de evitar fallos pasados, lo que aleja tu atención e interés de tus prospectos. Cada vez que un prospecto comienza a ir en contra de tu objetivo de comisionar comienzas a abandonar poco a poco el ciclo de venta pensando que será como otro prospecto que termino por no comprar</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de tolerar el fracaso y sueles recuperarte rápidamente de él, no evitas las negativas de tus clientes, puedes escucharlas aunque a veces te incomodas dependiendo de tu nivel de humor. Aunque eres capaz de afrontar fallos en tus ciclos de venta, aun existe un elevado nivel de estrés por fracasar. Los altibajos en tu nivel de actividad están relacionados con el tiempo que te toma volver a motivarte para entrar en acción</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, ideal</h2>' +
        //        '<div class="descripcionNivel">Tienes un elevado nivel de tolerancia al fracaso, puedes recuperarte casi instantáneamente de las negativas en tus ciclos de venta, esto te hace un vendedor persistente, capaz de superar objeciones y de mantener un elevado nivel de empatía con tus prospectos durante todo el proceso de venta. Esta disposición a ir por tu dosis de fracaso diaria u no tomarte las cosas de forma personal es una de los principales factores que te hacen un vendedor exitoso</div>' +
        //        '</div > ';
        //}
        //var descripNivel = response.jsonResultados[0][11];
        //var AreaConocimiento = descripNivel.AreaConocimiento;
        //var Calificacion = descripNivel.Calificacion;
        ////Nivel de comunicacion
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //}
        //var descripEnfoque = response.jsonResultados[0][12];
        //var AreaConocimiento = descripEnfoque.AreaConocimiento;
        //var Calificacion = descripEnfoque.Calificacion;
        ////Enfoque 
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //}
        //$('#respuestas').html(html);
        console.info(jsonseries);
        console.info(resultados);
        
        ////Fundamentos
        //if (Calificacion >= 0 && Calificacion <= 25) {
            
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
            
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {

        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} 
        //var descripProsp = response.jsonResultados[1];
        //var AreaConocimiento = descripProsp.AreaConocimiento;
        //var Calificacion = descripProsp.Calificacion;
        ////Prospeccion
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tienes muchas dificultades para prospectar debido a que desconoces casi por completo los fundamentos de la prospección. No sabes cómo prospectar y casi nunca lo intentas. Constantemente te las arreglas para seguir vendiendo, tienes una planificación nula de oportunidades porque no tienes oportunidades en tu embudo. Dependes por completo de los prospectos que la empresa te proporciona o de aquellos que el destino tiene para ti día con día. Es debido a este factor que experimentas un elevado nivel de incertidumbre respecto a tus ingresos mensuales</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección bajo</h2>' +
        //        '<div class="descripcionNivel">Tienes una noción básica de como prospectar pero tu nivel de conocimiento es deficiente, lo que provoca un elevado nivel de incertidumbre respecto a esta actividad. La incertidumbre tiene como resultado inacción, sabes que tienes que prospectar pero no estas seguro de por dónde empezar, de manera que evitas esta actividad a toda costa únicamente llevándola a cabo cuando es absolutamente necesaria o cuando alguien te obliga a hacerlo</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección medio</h2>' +
        //        '<div class="descripcionNivel">Tienes buenas noción sobre cómo prospectar, pero no tienes certeza total sobre el tema, lo que disminuye tu nivel de confianza. Esto provoca que trabajes por intervalos; con un elevado nivel de prospección por rachas, para luego dejar de hacerlo por largos periodos de tiempo. Este es el inicio de la montaña rusa de ingresos que experimentas mes con mes</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de prospección ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes los mecanismos de la prospección y disfrutas de sus beneficios, eres capaz de prospectar y obtener excelentes resultados, tu nivel de certeza en este tema es elevado, lo que incrementa tu disposición y nivel de confianza para abrir nuevas oportunidades. Tu siguiente nivel de habilidad seria ser capaz de prospectar de forma continua y consistente, lo que te llevaría aun más lejos en tus resultados. El esfuerzo sostenido en esta actividad y su reconocimiento como la actividad principal de tu ciclo de venta, garantizara un elevado nivel de oportunidades, vuelve la prospección tu primer prioridad</div>' +
        //        '</div > ';
        //} 
        //var descripRapport = response.jsonResultados[2];
        //var AreaConocimiento = descripRapport.AreaConocimiento;
        //var Calificacion = descripRapport.Calificacion;
        ////Rapport
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport muy deficiente.</h2>' +
        //        '<div class="descripcionNivel">Tienes un nivel muy deficiente de empatía con tus prospectos, experimentas dificultades para relacionarte y mantener un conversación amena, esto produce que abordes directamente los ciclos de venta sin construir antes una relación de alta calidad; lo que produce que mal entiendan tus propuestas y que te desesperes con facilidad ante cualquier tipo de adversidad. No tienes disposición para tratar de construir una relación con tus clientes, solo te interesas en venderles o así es como ellos te perciben. Prefieres las ventas transaccionales, aquellas que requieren la menor cantidad de relación posible</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de empatía con los clientes es bajo, esto significa que las conversaciones que sostienes con ellos son superficiales y no te permiten abordar los temas que en verdad le preocupan o interesan a tus prospectos, al ser incapaz de comunicarte con ellos a un nivel más personal siempre estas vendiendo sobre lo que consideras que les interesa. Tus propuestas suelen no estar completamente aterrizaras al interés real de tus prospectos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de mantener un buen nivel de empatía con tus prospectos lo que te permite incrementar el tiempo que los prospectos te otorgan en tus presentaciones de venta, los prospectos pueden conversar con apertura moderada sobre sus preocupaciones y problemas. Tienes la capacidad de cerrar un mayor numero de transacciones debido a que tus propuestas son consideradas valiosas y enfocadas al problema que el prospecto te confío. En este nivel de empatía puedes llegar a sobrepasar los limites con tus prospectos siendo poco asertivo y perdiendo tratos debido al excesivo nivel de confianza y permisividad que generas en un intento por caerles bien</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de Rapport ideal</h2>' +
        //        '<div class="descripcionNivel">Creas un elevado nivel de empatía con las personas esto es gracias a que no contradices a la gente, buscas temas en común en los cuales ambos puedan estar interesados y mantienes un ciclo de comunicación bien estructurado. Este nivel de conexión emocional te permite presentar propuestas aterrizadas hacia las problemáticas reales del prospecto y logra que los prospectos te “compren” antes de comprar el producto, lo que te da la capacidad de influir en gran medida en sus desiciones</div>' +
        //        '</div > ';
        //}
        //var descripVenta = response.jsonResultados[3];
        //var AreaConocimiento = descripVenta.AreaConocimiento;
        //var Calificacion = descripVenta.Calificacion;
        ////Venta Consultiva
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tu capacidad para entrevistar a tus prospectos y determinar cuales son sus problemáticas actuales y de donde provienen es muy deficiente, no eres capaz de identificar los objetivos a corregir ya que basas tu ciclo de venta en tu producto, en lugar de en las “soluciones” que este proporciona. Tratas a tus prospectos como una categoría de clientes en lugar de cómo un cliente especifico; lo que provoca que vendas cosas que en la mayoría de los casos no les produce verdaderos beneficios creando clientes de una sola compra y una mala reputación</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” bajo</h2>' +
        //        '<div class="descripcionNivel">En algunas ocasiones logras averiguar las problemáticas y objetivos de los prospectos, sin embargo no estas interesado en determinar su origen sino en vender tu producto lo antes posible. Esto produce que prometas cosas que no estas seguro de poder entregar pero que otorgas en un intento por cerrar el ciclo de venta lo antes posible, dejando la carga y responsabilidad a otros departamentos. En resumen tus ciclos de venta “cuestan” dinero</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” medio</h2>' +
        //        '<div class="descripcionNivel">Casi siempre logras identificar las problemáticas y objetivos de tu prospecto, estás interesado en determinar las causas de sus dificultades y en proporcionar soluciones reales a los problemas que identificas , en general eres confiable y ético en tus propuestas y productos. Necesitas afinar tus habilidades para llevarlo a cabo con mayor frecuencia</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de “Venta Consultiva” ideal</h2>' +
        //        '<div class="descripcionNivel">Realizas un excelente análisis de las problemáticas y objetivos de tus prospectos, lo que te permite construir una consultoría integral que suele producir muchas más ventas de las esperadas, logras posicionarte a través de un profundo conocimiento de tus prospectos, lo que incrementa su nivel de confianza al punto en que te consultan activamente sobre las desiciones para mejorar su situación y siguen casi al pie de la letra tus recomendaciones. El nivel de comprensión que logras construir con tus prospectos es uno de los principales pilares de tu éxito</div>' +
        //        '</div > ';
        //}
        //var descripDolor = response.jsonResultados[4];
        //var AreaConocimiento = descripDolor.AreaConocimiento;
        //var Calificacion = descripDolor.Calificacion;
        ////Dolor del PRospecto
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tienes un incapacidad muy marcada para determinar los puntos de dolor de tus prospectos, lo que te incapacita para mantenerlos interesados en todo momento. Esta situación produce que constantemente te enfrentes con objeciones de precio y de producto. Los prospectos pensaran constantemente que es mas de lo que necesitan o que están pagando por cosas que no requieren, lo que inevitablemente los llevara a pedirte descuentos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu capacidad para determinar los puntos de dolor de tus prospectos es baja pero en ocasiones puedes encontrarlos. Desconoces como están estructurados los niveles de motivos de compra y constantemente tratas de buscar que necesidades tienen tus prospectos lo que produce que tus prospectos si se interesen por tu producto pero que en la mayoría de las ocasiones pospongan las desiciones de compra</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, medio</h2>' +
        //        '<div class="descripcionNivel">Tienes una buena capacidad de determinar los dolores de tus prospectos, te enfocas en que problemas puedes ayudar a resolver y esto incrementa el nivel de urgencia en tus ciclos de venta; lo que te lleva a concretar un mayor numero de transacciones. Un conocimiento más preciso sobre los motivos dominantes de compra de los prospectos te hará mucho más capaz de cerrar ciclos de venta y erradicara por completo las objeciones de precio sobre tus productos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de identificación del dolor del prospecto, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes muy bien cómo identificar los puntos de dolor de tus prospectos, eres capaz de mantenerlos altamente interesados sobre tus presentaciones de venta. Despiertas un elevado nivel de urgencia en tus prospectos lo que hace que vendas más y con mayor velocidad. Al ser capaz de encontrar y resolver los puntos de dolor de tus prospectos erradicas casi por  completo la necesidad de manejar objeciones de precio o de producto, en la mayoría de las ocasiones tus prospectos piensan que tienes exactamente lo que están buscando y están dispuestos a pagar por ello sin objeción alguna</div>' +
        //        '</div > ';
        //}
        //var descripSeg = response.jsonResultados[5];
        //var AreaConocimiento = descripSeg.AreaConocimiento;
        //var Calificacion = descripSeg.Calificacion;
        ////Seguimiento
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de seguimiento es nulo, pierdes más del 70% de todos los tratos que trabajas mes con mes por tu incapacidad para mantenerte en contacto con el prospecto y para volver a interesarlo. No tienes un patrón de seguimiento definido y ni siquiera consideras que se requiera. Esta forma de operar te hará perder un elevado numero de prospectos ya que efectivamente llevas a cabo acciones para venderle a tus prospectos, pero de forma muy deficiente, experimentando frustración por “trabajar” pero no cobrar, haciendo que abandones las ventas debido al nivel de frustración</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de seguimiento es muy bajo, pierdes más de la mitad de todos los tratos que inicias debido a esta incapacidad para mantenerte persistente sobre tus prospectos. No cuentas con un patrón de seguimiento y solo contactas de manera casual cada que recuerdas que alguien no te ha respondido. Consideras que una falta de respuesta es una falta de interés y descartas a clientes potenciales a los que tu competencia termina vendiéndoles</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, medio</h2>' +
        //        '<div class="descripcionNivel">Tienes un buen nivel de seguimiento, tratas de contactar en variadas ocasiones a tus prospectos, sin embargo al carecer de una metodología y de un plan sueles cansar a las personas con las que interactúas lo que hace pensar si es correcto o no dar seguimiento. Aunque eres capaz de persistir tu técnica es burda y produce resultados intermitentes</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de seguimiento, ideal</h2>' +
        //        '<div class="descripcionNivel">Conoces bien la importancia del seguimiento y tienes la capacidad de persistir con tus clientes hasta obtener una respuesta. Planificas y estructuras como y cuando los contactaras, te preocupas por tener una estrategia para volver a contactarlos, esta capacidad de seguimiento te pone por encima de tus competidores y compañeros de trabajo ya que cada mes inicias con oportunidades mientras ellos inician en cero</div>' +
        //        '</div > ';
        //}
        //var descripManejo = response.jsonResultados[6];
        //var AreaConocimiento = descripManejo.AreaConocimiento;
        //var Calificacion = descripManejo.Calificacion;
        ////Manejo de Objeciones
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No tienes ni idea de como manejar una objeción, probablemente mal entiendes y  confundes todos los términos que tienen que ver con este tema, hasta en un 90% de los casos no sabes que decir ni que hacer frente a las objeciones del prospecto, tienes a evitarlas y a fingir que no las escuchas, aplicas el manejo incorrecto casi en todas las oportunidades que se te presentan y pierdes más del 90% de tus ciclos de venta por quedarte congelado frente a las negativas de tus prospectos</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, bajo</h2>' +
        //        '<div class="descripcionNivel">Cuentas con un nivel muy bajo de manejo de objeciones, cuando logras sobreponerte a ellas es meramente por coincidencia o porque el prospecto mismo trabaja la objeción. No sabes diferenciar entre quejas y objeciones, objeciones validas e invalidas, lo que provoca que metas a tus clientes en ciclos interminables de objeciones inventadas, obligándolos a mentir y acabando con tu paciencia cuando te das cuenta de que están inventando razones para no comprarte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, medio</h2>' +
        //        '<div class="descripcionNivel">Intentas superar las objeciones que se te presentan, puedes identificar objeciones durante el ciclo de venta, pero aun no estas seguro de como manejarlas, solo haces tu mejor esfuerzo porque careces de técnica y conocimiento preciso para superarlas. Esto produce ventas que no estas seguro de cómo lograste tornando tus resultados en una cuestión de temporadas y suerte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de manejo de objeciones, ideal</h2>' +
        //        '<div class="descripcionNivel">Puedes identificar con claridad las objeciones que escuchas gracias a tu disposición para encontrarlas, comprendes que las objeciones están ahí para ser encontradas y eliminadas, de manera natural tiendes a manejarlas de forma efectiva, pero serias mucho más capaz de superarlas sí conocieras por completo sus orígenes y mecanismos. Puedes reducir dramáticamente el tiempo que inviertes manejando objeciones al conocer las leyes de cómo se previenen y se superan</div>' +
        //        '</div > ';
        //}
        //var descripCierre = response.jsonResultados[7];
        //var AreaConocimiento = descripCierre.AreaConocimiento;
        //var Calificacion = descripCierre.Calificacion;
        ////Cierre de Ventas
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No tienes idea de como cerrar tratos, más del 90% de todos los ciclos de venta que concretas se hubieran concretado incluso si tu no hubieras sido parte de ellos, tus resultados se basan en el porcentaje de cierre natural que hay en tu industria es decir que tu participación es casi nula y el principal factor de compra son las ventajas y atributos de tu producto y no tu nivel de conocimiento o influencia sobre el ciclo de venta</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, bajo</h2>' +
        //        '<div class="descripcionNivel">El algunas ocasiones llegas a cerrar una transacción pero estas completamente inconsciente de que fue exactamente lo que produjo tu cierre. Casi nunca intentas el cierre con tus prospectos a menos que pienses que están muy convencidos de comprar, tu incapacidad para pedir el cierre te mete en ciclos de venta muy largos que tus prospectos terminan posponiendo porque los agotas; dando vueltas en la información del producto en lugar de en el cierre de la operación</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de causar ciclos de cierre pero tu porcentaje esta por debajo del promedio, consideras que intentas el cierro mucho más de lo que en realidad lo haces, evades la zona de cierre porque tu nivel de tolerancia al fracaso no es elevada lo que te vuelve cuidadoso, este nivel de alejamiento de la zona de cierre produce resultados pobres</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de cierre de ventas, ideal</h2>' +
        //        '<div class="descripcionNivel">Cuentas con un elevado porcentaje de cierre incluso por encima del promedio de tu industria, esto se debe a tu capacidad para pedir el cierre y presionar de forma profesional a tus prospectos y clientes. Construyes suficiente empatía con tus prospectos a través de una elevado nivel de rapport en el inicio del proceso lo que te permite intentar el cierre en múltiples ocasiones sin incomodar a tus prospectos, ya tu numero de intentos de cierre es mayor tu capacidad para concretar ciclos de venta es muy elevada</div>' +
        //        '</div > ';
        //}
        //var descripObten = response.jsonResultados[8];
        //var AreaConocimiento = descripObten.AreaConocimiento;
        //var Calificacion = descripObten.Calificacion;
        ////Obtencion de Referidos
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">La obtención de referidos es totalmente nula en tus procesos de venta, si llegas a obtener referidos no es jamás gracias a tu esfuerzo por requerirlos, son completamente efecto de la experiencia positiva que pueda provocar tu producto. Al no considerar qué requieres solicitarlos no cuentas con ningún tipo de proceso para hacerlo. Padeces de escapes de prospectos auto- generados y solo dependes del trafico que tu empresa trae hacia ti</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de obtención de referidos es completamente incidental, rara vez los solicitas por cuenta propia, no te niegas a tomarlos, pero en la mayoría de los casos ni siquiera les das seguimiento. No comprendes que la generación de referidos es tu primera garantía de un proceso de venta de calidad</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, medio</h2>' +
        //        '<div class="descripcionNivel">Consideras que la obtención de referidos es muy importante, pero realmente no lo crees, por lo que los solicitas siempre que no se te olvide. No has experimentado la racha creciente de ventas que pueden producirte los referidos y estas convencido de que si vas a vender tienes que salir a buscar oportunidades en lugar de aprovechar y explotar aquellas en las que ya tuviste éxito y que están completamente dispuestas a apoyarte. Mucha suerte</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de obtención de referidos, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes la importancia de la obtención de referidos con toda claridad, has experimentado las ganancias que pueden producir un buen numero de referidos y la facilidad con la que pueden ser cerrados en comparación con contactos en frio. Los solicitas activamente, aunque no estas completamente seguro de cual seria el mejor momento o Pitch para hacerlo, un entrenamiento especializado en este tema, te ayudaría a generarlos consistentemente garantizando vender 5 a 6 veces más que tus competidores</div>' +
        //        '</div > ';
        //}
        //var descripProceso = response.jsonResultados[9];
        //var AreaConocimiento = descripProceso.AreaConocimiento;
        //var Calificacion = descripProceso.Calificacion;
        ////procesos de ventas
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">Desconoces por completo la importancia y uso de un proceso de venta, consideras que solo requieres seguir tu sentido común e imitar a tus compañeros y a otros vendedores, este aprendizaje por experiencia te hereda más errores y malas practicas de las que te imaginas. Te resistes a los procesos de venta incluso cuando son funcionales debido a que consideras que la forma en la que has hecho las cosas funciona de alguna u otra manera, lo que no comprendes es que las ventas que logras concretar no se deben a tu forma de hacer las cosas sino a los porcentajes naturales de venta de tu producto, podrías vender mucho más si estuvieras dispuesto a cambiar tus patrones</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, bajo</h2>' +
        //        '<div class="descripcionNivel">Estas consciente de que los procesos de venta deben de ser seguidos pero no comprendes los “porqués” de muchas de sus fases. Esto produce que dudes constantemente si debes o no seguirlos, lo que te hace muy descuidado en su aplicación y evita que logres ganar certeza en su uso, esto significa que no experimentas éxito por tu falta de disciplina, la cual solo es un reflejo de tu falta de entrenamiento</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de seguir tus procesos de venta, pero lo haces demasiado mecánicamente, ya que los aprendes de forma superficial, siempre estas buscando formulas para lograr aplicar las diferentes etapas del proceso en lugar de ganar una profunda comprensión de cada una de ellas. Esta forma de utilizar tu proceso provoca que pierdas tratos en algunas ocasiones, estas más preocupado por el proceso que por el efecto del proceso en tu prospecto</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de proceso de venta, ideal</h2>' +
        //        '<div class="descripcionNivel">Comprendes los propósitos de cada una de las fases de tus procesos de ventas y conoces a profundidad la información y objetivos que debes de lograr en cada una de ellas, esto hace que experimentes éxito con la aplicación de tu proceso y permite que te sigas apegando a su uso diario. Conocer mejor el proceso al punto en que puedas aplicarlo de forma dinámica a tus prospectos te hará mucho más efectivo y exitoso</div>' +
        //        '</div > ';
        //}
        //var descripToleran = response.jsonResultados[10];
        //var AreaConocimiento = descripToleran.AreaConocimiento;
        //var Calificacion = descripToleran.Calificacion;
        ////Tolerancia al fracaso
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, muy deficiente</h2>' +
        //        '<div class="descripcionNivel">No toleras el fracaso en lo absoluto, incluso experimentas sensaciones orgánicas intensas al encontrarte en situaciones en las que no eres capaz de salirte con la tuya. Tu elevado nivel de temor, te congela eliminando tu nivel de acción, y con ello tus resultados. Estás compulsivamente evitando fallar, en lugar de concentrarte en tener éxito, este nivel tan alto de temor es uno de los principales factores que evita que te consolides como vendedor profesional. Te irritas con facilidad y pierdes el control de tus ciclos de venta debido a tu nivel  de sensibilidad contra cualquiera que vaya en contra de ganar tus comisiones</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, bajo</h2>' +
        //        '<div class="descripcionNivel">Tu nivel de tolerancia al fracaso es sumamente bajo, experimentas incomodidad física y sueles desmotivarte causando que disminuyas tu nivel de actividad por largos periodos de tiempo. Realizas ciclos de venta fuera de tiempo presente tratando de evitar fallos pasados, lo que aleja tu atención e interés de tus prospectos. Cada vez que un prospecto comienza a ir en contra de tu objetivo de comisionar comienzas a abandonar poco a poco el ciclo de venta pensando que será como otro prospecto que termino por no comprar</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, medio</h2>' +
        //        '<div class="descripcionNivel">Eres capaz de tolerar el fracaso y sueles recuperarte rápidamente de él, no evitas las negativas de tus clientes, puedes escucharlas aunque a veces te incomodas dependiendo de tu nivel de humor. Aunque eres capaz de afrontar fallos en tus ciclos de venta, aun existe un elevado nivel de estrés por fracasar. Los altibajos en tu nivel de actividad están relacionados con el tiempo que te toma volver a motivarte para entrar en acción</div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2 class="Gold">Nivel de tolerancia al fracaso, ideal</h2>' +
        //        '<div class="descripcionNivel">Tienes un elevado nivel de tolerancia al fracaso, puedes recuperarte casi instantáneamente de las negativas en tus ciclos de venta, esto te hace un vendedor persistente, capaz de superar objeciones y de mantener un elevado nivel de empatía con tus prospectos durante todo el proceso de venta. Esta disposición a ir por tu dosis de fracaso diaria u no tomarte las cosas de forma personal es una de los principales factores que te hacen un vendedor exitoso</div>' +
        //        '</div > ';
        //}
        //var descripNivel = response.jsonResultados[11];
        //var AreaConocimiento = descripNivel.AreaConocimiento;
        //var Calificacion = descripNivel.Calificacion;
        ////Nivel de comunicacion
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //}
        //var descripEnfoque = response.jsonResultados[12];
        //var AreaConocimiento = descripEnfoque.AreaConocimiento;
        //var Calificacion = descripEnfoque.Calificacion;
        ////Enfoque 
        //if (Calificacion >= 0 && Calificacion <= 25) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 26 && Calificacion <= 50) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 51 && Calificacion <= 85) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //} else if (Calificacion >= 86 && Calificacion <= 100) {
        //    html += '<div class="contenedorNivel">' +
        //        '<h2></h2>' +
        //        '<div class="descripcionNivel"></div>' +
        //        '</div > ';
        //}

        
        ////html += ''

        //$('#respuestas').html(html);
        //window.location.href = "http://localhost:2205/Encuesta/Respuestas";
        //console.log(AConocimiento);
    }
    
   

    this.CargaDatosCors = function (Op) {
        var _url = (Op.url) ? Op.url : '';
        var _data = (Op.data) ? Op.data : '';
        var _callback = (Op.callback) ? Op.callback : '';

        $.ajax({
            url: _url,
            async: false,
            crossDomain: true,
            data: _data,
            type: "GET",
            async: false,
            jsonp: false,
            success: function (response) {
               // console.info(response, 'CargaDatos');
                if (_callback) {
                    //console.info("Hay Callback");
                    _callback(response);
                }
            }
        });
    }

    this.mostrarGrafica = function () {
        //var primerArray = (jsonPreg.AConocimiento).toString();
        //var segundoarray = (jsonPreg.Califi).toString();
     //   console.log(AConocimiento);
       // console.log(Califi);
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: AConocimiento
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            
            series: jsonseries
        
        });
    }
}

