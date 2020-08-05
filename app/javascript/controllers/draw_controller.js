import { Controller } from 'stimulus'; 
import {application} from 'controllers';

application.register('draw', class extends Controller {
  connect() {
    console.log("AAAAAAAAAAAAAAAA");
  }
});