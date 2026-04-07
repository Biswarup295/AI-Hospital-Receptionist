create table if not exists patient_intakes (
  id text primary key,
  patient_name text not null,
  patient_age integer not null check (patient_age >= 0 and patient_age <= 120),
  patient_query text not null,
  ward text not null,
  timestamp timestamptz not null default timezone('utc', now())
);

create index if not exists patient_intakes_timestamp_idx
  on patient_intakes (timestamp desc);

