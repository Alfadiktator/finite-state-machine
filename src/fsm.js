
class FSM {
    constructor(config) {
        if(typeof config === "undefined"){
            throw Error();
        }
        this.config=config;
        this.starr=[this.config.initial];
        this.index=0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
       return this.starr[this.index];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    pushing(state){
        this.index++;
        if(this.starr.length==this.index){
            this.starr.push(state);
        }
        else{
            this.starr[this.index]=state;
        }
    }

    changeState(state) {
        if(state==this.getState()){
            return;
        }
        if(this.config.states.hasOwnProperty(state)){
            this.pushing(state);
            return;
        }
        throw Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.getState()].transitions.hasOwnProperty(event)){
            this.pushing(this.config.states[this.getState()].transitions[event])
        }
        else{
            throw Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.pushing(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(typeof event === "undefined"){
            return Object.keys(this.config.states);
        }
        var st=[];
        for(var i in this.config.states){
            if(this.config.states.hasOwnProperty(i)){
                if(this.config.states[i].transitions.hasOwnProperty(event)){
                    st.push(i);
                }
            }
        }
        return st;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.index==0){
            return false
        }
        else{
            this.index--;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.index==this.starr.length-1){
            return false;
        }
        else{
            this.index++;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.index=0;
        this.starr=[this.config.initial];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
