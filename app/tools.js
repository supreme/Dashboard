/** 
 * Contains various utility methods.
 * @author Stephen Andrews
 * @since 12.11.16
 */
module.exports = {
    fetchCampusEvents: (res, spawn) => {
        const script = spawn('sh', ['../python/update.sh']);
        var response = {}

        script.stderr.on('data', (data) => {
            response['status'] = 'Error';
            response['message'] = data.toString('utf8');
            res.end(JSON.stringify(response));
        });

        script.on('close', (code) => {
            response['status'] = 'Success';
            response['message'] = 'Visit /api/events to view data';
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        });
    },
    getTestData: () => {
        let cards = [
        {
            'type': 'default',
            'title': 'F',
            'content': 'I got twoooooooo versions',
            'updated-at': '7 mins ago'
        },
            {
            'type': 'default',
            'title': 'F',
            'content': 'I got twoooooooo versions',
            'updated-at': '7 mins ago'
        },
            {
            'type': 'default',
            'title': 'F',
            'content': 'I got versions',
            'updated-at': '7 mins ago'
        }];
        return cards;
    }
}