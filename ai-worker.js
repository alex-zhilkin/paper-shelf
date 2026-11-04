import {WebWorkerMLCEngineHandler} from './vendor/webllm/index.js';
const handler=new WebWorkerMLCEngineHandler();
self.onmessage=message=>handler.onmessage(message);
