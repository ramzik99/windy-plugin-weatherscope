import type { ExternalPluginConfig } from '@windy/interfaces';
const config: ExternalPluginConfig = {
 name:'windy-plugin-weatherscope', version:'0.6.1', icon:'◉', title:'WeatherScope',
 author:'Ramzi Kandah', repository:'https://github.com/ramzik99/windy-plugin-weatherscope',
 description:'Every detail. One clear forecast. ECMWF baseline and complete returned-parameter explorer.',
 desktopUI:'rhpane', mobileUI:'fullscreen', routerPath:'/weatherscope/:lat?/:lon?',
 addToContextmenu:true, listenToSingleclick:true, private:true
};
export default config;

