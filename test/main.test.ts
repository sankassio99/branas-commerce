import axios from "axios";



test('Dont should accept a order with invalid CPF', async () => {
    const input = {
        cpf: "406.302.170-27"
    };

    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBe("Invalid cpf");
});