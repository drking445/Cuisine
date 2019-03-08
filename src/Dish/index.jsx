import React from 'react';

const buttonStyle = {
    listStyleType: "none"
};

class Dish extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          newItem: "",
            deleteItem: "",
            list: [],
            dishWithIngredients: [{}],
            show: false
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showDish = this.showDish.bind(this);
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    updateInput(value){
        this.setState({newItem: value});
    }

    updateInput2(value){
        this.setState({deleteItem: value});
    }

    addItem() {
        // copy current list of items
        const list = [...this.state.list];
        const dishWithIngredients = this.state.newItem.split(',');
        const newDish = dishWithIngredients[0];
        const newList = [];
        for(let i = 1; i < dishWithIngredients.length; i++){
            newList.push(dishWithIngredients[i]);
        }
        const addDishWithIngredient = {name: newDish, ingredients: newList};
        this.state.dishWithIngredients.push(addDishWithIngredient);
        // add the new item to the list
        if(list.indexOf(newDish) === -1) {
            list.push(this.state.newItem);

            // update state with new list, reset the new item input
            this.setState({
                list,
                newItem: ""
            });
        }
        else{
            alert("This dish is already in the system!");
        }
    }

    deleteItem() {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted

        if(list.indexOf(this.state.deleteItem) === -1){
            alert("This dish does not exist!");
        }

        const tempIngredientList = this.state.dishWithIngredients;
        for(let i = 0; i < tempIngredientList.length; i++){
            if(tempIngredientList[i].name === this.state.deleteItem){
                tempIngredientList.splice(i, 1);
            }
        }

        this.setState({ dishWithIngredient: tempIngredientList, deleteItem: "" });
    }

    showDish(){
        this.setState({show: !this.state.show});
    }

    render(){

        return(
            <html>
            <ul style={buttonStyle}>
                <li style={{paddingBottom: 20}}> International Cuisine</li>
                <li> <input placeholder="Enter dish" value={this.state.newItem} onChange={e => this.updateInput(e.target.value)}></input><button onClick={this.addItem}>Add Dish</button></li>
                <li> <input placeholder="Enter dish" value={this.state.deleteItem} onChange={e => this.updateInput2(e.target.value)}></input><button onClick={this.deleteItem}>Delete Dish</button></li>
                <li> <button onClick={this.showDish}>View Dishes</button></li>
                <div>
                    {this.state.show && this.state.dishWithIngredients.map((item, i) =>
                        <div>{item.name} :  {item.ingredients}</div>
                    )}
                </div>
            </ul>
            </html>
        );
    }
}
export default Dish;