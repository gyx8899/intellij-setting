#if (${ExtendClass} && ${ExtendClass} != "")
import ${ExtendClass} from './${ExtendClass}.js';
#end

/** @class ${NAME}: #[[$Description$]]# */

class ${NAME}#if (${ExtendClass} != "") extends ${ExtendClass} #end{
#if (${paramFirst} == "" && ${hasOptions} == "")
    /**
     * Creates an instance of ${NAME}.
     *
     * @constructor
     */
#end
#if (${paramFirst} != "" && ${hasOptions} == "")
    /**
     * Creates an instance of ${NAME}.
     *
     * @constructor
     * @param {#[[$ParamType$]]#} ${paramFirst}: #[[$ParamDescription$]]#.
     */
#end
#if (${paramFirst} != "" && ${hasOptions} != "")
    /**
     * Creates an instance of ${NAME}.
     *
     * @constructor
     * @param {#[[$ParamType$]]#} ${paramFirst}: #[[$ParamDescription$]]#.
     * @param {object} options: custom options compared with default ${NAME}.Options.
     */
#end
#if (${paramFirst} == "" && ${hasOptions} != "")
    /**
     * Creates an instance of ${NAME}.
     *
     * @constructor
     * @param {object} options: custom options compared with default ${NAME}.Options.
     */
#end
    constructor(#if (${paramFirst} != "") ${paramFirst} = #if (${paramFirstDefault} != "") ${paramFirstDefault} #else null #end #end #if (${hasOptions} != ""), options = {} #end) {
        #if (${ExtendClass} != "")
        super(${paramFirst}); 
        #end
        /** @public */
        this.name = '${NAME}';
        
        /** @private */
        #if (${paramFirst} != "")
        this._${paramFirst} = ${paramFirst};
        #end
        #if (${hasOptions} != "")
         this._options = {
            ...${NAME}.Options,
            ...options
        };
        #end
        this._active = true;
        
        // init actions
        #[[$END$]]#
    }
    
    /** @static */
    static Options = {
        
    };
    static EventTypes = {
        '${NAME}_INIT': '${NAME}_INIT',
    };
    
    static getInstance(...args) {
        if (!${NAME}.instance) {
          ${NAME}.instance = new ${NAME}(...args);
        }
        return ${NAME}.instance;
    }
    
    /** @public */
    setValue(newValue) {
        this.value = newValue;

        return this;
    }
    getValue() {
        return this.value;
    }

    getAsyncFeed() {
        try {
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                // Do your data process
                if (this._active) {
                    this.data = this._processData(data);
                }
            }).catch((err) => {
                console.error(err);
            });
        } catch (err) {
            console.error(err);
        }
    }
    
    /**
    * destroy: 
    * 1. super.destroy();
    * 2. clearTimeout / clearInterval;
    * 3. removeEventListener;
    * 4. clear insert/update dom in component;
    * 5. reset _active with false for async callback;
    */
    destroy() {
        #if (${ExtendClass} != "")
        super.destroy(); 
        
        #end
        this._active = false;
        
        
    }
    
    /** @private */
    _processData(data) {
        let _data = {...data};
        // process
        
        return _data;
    }
}

export default ${NAME};