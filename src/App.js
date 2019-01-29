import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import { Form, InputNumber } from 'antd';

class App extends Component {
    constructor (props) {
        super(props);

        const items = [
            this.ItemObject('milk', 60, amount => amount * 40, amount => amount > 3),
            this.ItemObject('egg', 5, amount => (5 * amount % 12) + (45 * (amount - (amount % 12))), (amount) => amount > 12),
            this.ItemObject('bread', 3, amount => amount * (0.6), amount => amount > 2),
        ];

        this.state = {
            items,
            total: 0,
        };
    }

    ItemObject = (label, price, specialPrice, specialPriceCondition) => {
        return {
            amount: 0,
            total: function () {
                return this.specialPriceCondition(this.amount) ? this.specialPrice(this.amount): this.price * this.amount;
            },
            label,
            price,
            specialPrice,
            specialPriceCondition,
        };
    };

    onChange = (value, index) => {
        const {items} = this.state;
        items[ index ].amount = value;

        this.setState({items});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {items} = this.state;
        const total = items.reduce((accumulator, element) => accumulator + element.total(), 0);

        this.setState({total});
    };

    FormItem = (item, index) =>
        <div>
            <div>{ item.label }</div>
            <InputNumber
                min={ 0 }
                defaultValue={ 0 }
                onChange={ value => this.onChange(value, index) }
            />
        </div>;

    render () {
        const {items, total} = this.state;

        return (
            <div className="App">
                    <Form onSubmit={ this.handleSubmit }>
                        { items.map((item, index) => this.FormItem(item, index)) }
                        <Button htmlType="submit">Submit</Button>
                    </Form>
                    {"Total:" + total}
            </div>
        );
    }
}

export default App;
