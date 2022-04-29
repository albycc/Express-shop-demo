import path from 'path';
import {fileURLToPath} from 'url';

export const dirname = () =>{
    const __filename = fileURLToPath(import.meta.url);
    return path.join(path.dirname(__filename), '../');
}
