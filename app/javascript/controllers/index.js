import {Application} from 'stimulus';
import {definitionsFromContext} from 'stimulus/webpack-helpers';

export const application = Application.start();
const context = require.context('./', true, /_controller\.js$/);
application.load(definitionsFromContext(context));
