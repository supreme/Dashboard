/** 
 * Contains various utility methods.
 * @author Stephen Andrews
 * @since 12.11.16
 */
module.exports = {
    fetchCampusEvents: (res, spawn) => {
        const script = spawn('sh', ['../python/update.sh']);
        var output = '';

        script.stdout.on('data', (data) => {
          console.log(data.toString('utf8'));
          output += data.toString('utf8');
        });

        script.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        script.on('close', (code) => {
          console.log("Finished: " + code);
          res.end(output);
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