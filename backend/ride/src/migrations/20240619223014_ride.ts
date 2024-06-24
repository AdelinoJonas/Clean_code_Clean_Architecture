import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("ride", (table) => {
    table.increments("ride_id").primary();
    table.string("driver_id", 20).nullable();
    table.string("passenger_id", 20).notNullable();
    table.string("from_lat", 20).notNullable();
    table.string("from_long", 20).notNullable();
    table.string("to_lat", 20).notNullable();
    table.string("to_long", 20).notNullable();
    table.string("status", 20).notNullable();
    table.timestamp("request_date");
    table.timestamp("accept_date");
    table.timestamp("start_date");
    table.timestamp("end_date");
    table.decimal("price", 10, 2).notNullable();
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("ride");
}

