import type { ExternalPluginConfig } from '@windy/interfaces';
const config: ExternalPluginConfig = {
 name:'windy-plugin-weatherscope', version:'0.2.0', icon:'◉', title:'WeatherScope',
 description:'Every detail. One clear forecast. Meteoblue baseline and complete returned-parameter explorer.',
 desktopUI:'rhpane', mobileUI:'fullscreen', routerPath:'/weatherscope/:lat?/:lon?',
 addToContextmenu:true, listenToSingleclick:true, private:true
};
export default config;
