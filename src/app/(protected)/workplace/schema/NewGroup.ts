import { unique } from "next/dist/build/utils";
import { z } from "zod";
export const NewGroupSchema = z.object({
  name: z.string(),
  uniqueGroupName: z.string(),

  // PictureUrl: z.string().url().nullable(),
});
