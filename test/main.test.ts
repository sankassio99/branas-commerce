import axios from "axios";


test('Dont should accept a order with invalid CPF', async () => {
    const input = {
        cpf: "406.302.170-27"
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBe("Invalid cpf");
});

test('Should create a order', async () => {
    const input = {
        cpf: "406.302.170-27"
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBeNull;
});

test('Should create a order with 3 products', async () => {
    const input = {
        cpf: "345.229.790-02",
        items: [
            {id: '1', quantity: 1},
            {id: '2', quantity: 1},
            {id: '3', quantity: 3},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(130);
});