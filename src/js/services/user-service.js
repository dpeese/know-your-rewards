import axios from 'axios';

class UserService {
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    /**
     * This method will be called on login
     */
    login = (payload) => {
        return axios.get('data/login-creds.json')
            .then(this.checkStatus)
            .then(value => this.validateCreds(value, payload))
    }
    /**
     * This method is to validate creds
     */
    validateCreds = (response, payload) => {
        return response.find(res => res.userName === payload.userName && res.password === payload.password) ? true : false;
    }
    /**
     * This method gets transactions from mock JSON
     */
    getTransactions = (userName) => {
        return axios.get(`data/transactions-${userName}.json`)
            .then(this.checkStatus)
            .then(value => this.groupByMonth(value))
    }

    /**
     * This method will group transactions by month
     */
    groupByMonth = (response) => {
        var transactionsByMonth = new Map();
        // Sort Records by descending
        response = response.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        response.forEach(transaction => {
            transaction.reward = 0;
            if (transaction.transactionType !== 'CREDIT') {
                // 2 points for every dollar spent over 100
                const spentOver100 = transaction.transactionAmount - 100 >= 1 ? 2 * (transaction.transactionAmount - 100) : 0; // over 100
                // 1 point for every dollar spent over 50
                const spentOver50 = spentOver100 > 0 ? 50 : (transaction.transactionAmount - 50) > 1 ? (transaction.transactionAmount - 50 * 1) : 0; // over 50
                // Round the points
                transaction.reward = Math.round(spentOver100 + spentOver50);
            }
            const transDate = new Date(transaction.transactionDate);
            const key = `${this.monthNames[transDate.getMonth()]}-${transDate.getFullYear()}`;
            if (transactionsByMonth.has(key)) {
                const value = transactionsByMonth.get(key);
                let rewards = value.rewards + transaction.reward;
                transactionsByMonth.get(key).rewards = rewards;
                transactionsByMonth.get(key).transactions.push(transaction);
            } else {
                transactionsByMonth.set(key, {
                    rewards: transaction.reward,
                    transactions: [transaction]
                }
                );
            }
        });
        return transactionsByMonth;
    }
    /**
     * This method is to validate status
     */
    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    };
}


export default UserService;