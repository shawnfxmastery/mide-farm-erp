export interface BirdBatch {
  id: number;

  batch_number: string;
  breed: string;
  arrival_date: string;

  quantity: number;
  alive: number;
  mortality: number;
  mortality_percentage: number;

  age_weeks: number;
  stage: string;

  supplier: string;

  vaccination_status: string;
  health_status: string;

  notes: string;
}