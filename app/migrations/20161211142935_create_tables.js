let DEV_MODE = false;

exports.up = (knex, Promise) => {
      return Promise.all([
        knex.schema.createTableIfNotExists('imagecards', (table) => {
            table.increments();
            table.string('image');
            table.string('text');
            table.string('url');
            table.timestamps();
        }),
        knex.schema.createTableIfNotExists('events', (table) => {
            table.increments();
            table.integer('date');
            table.string('image');
            table.string('name');
            table.string('org');
            table.string('time');
            table.timestamps();
        }),
        knex.schema.createTableIfNotExists('dailyherd', (table) => {
            table.increments();
            table.integer('date');
            table.string('image');
            table.string('title');
            table.string('link');
            table.timestamps();
        }),
    ]);
};

exports.down = (knex, Promise) => {
    if (DEV_MODE) {
        knex.schema.dropTableIfExists('imagecards');
        knex.schema.dropTableIfExists('events');
        knex.schema.dropTableIfExists('dailyherd');
    }
};
