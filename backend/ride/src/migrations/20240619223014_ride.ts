import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("ride", (table) => {
    table.increments("ride_id").primary();
    table.string("passenger_id", 20).notNullable();
    table.string("from_lat", 20).notNullable();
    table.string("from_long", 20).notNullable();
    table.string("to_lat", 20).notNullable();
    table.string("to_long", 20).notNullable();
    table.string("status", 20).notNullable();
    table.timestamp("request_date").defaultTo(knex.fn.now());
    table.timestamp("accept_date").defaultTo(knex.fn.now());
    table.timestamp("start_date").defaultTo(knex.fn.now());
    table.timestamp("end_date").defaultTo(knex.fn.now());
    table.decimal("price", 10, 2).notNullable();
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("ride");
}

