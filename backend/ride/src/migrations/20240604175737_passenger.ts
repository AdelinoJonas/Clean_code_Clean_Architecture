import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("passenger", (table) => {
    table.increments("passenger_id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("document", 20).notNullable();
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("passenger");
}

