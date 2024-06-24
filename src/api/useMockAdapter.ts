import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import questions from '../data/questions.json'

const useMockAdapter = () => {
	const mock = new MockAdapter(axios, { delayResponse: 600 })

	mock.onGet('/api/questions').reply(200, questions)
}

export default useMockAdapter
