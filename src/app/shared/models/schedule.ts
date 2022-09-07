import { ScheduleStatus } from "./enums";
import { Establishment } from "./establishment";
import { Professional } from "./professional.model";
import { UserSUS } from "./user-sus.model";

export interface Schedule {
    id: number | null;
    establishment: Establishment | null;
    date: string | null;
    status: ScheduleStatus | null;
    userSus: UserSUS | null;
    professional: Professional | null;
}
