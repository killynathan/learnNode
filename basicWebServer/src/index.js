import { startServer } from './server';
import { route } from './router';
import { start, upload, show } from './requestHandlers';

var handle = {};
handle["/"] = start;
handle["/start"] = start;
handle["/upload"] = upload;
handle["/show"] = show;

startServer(route, handle);
