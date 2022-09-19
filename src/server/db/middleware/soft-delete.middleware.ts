import { Prisma, Status } from "@prisma/client";
import { config } from "node-config-ts";

const softDeleteMiddleware: Prisma.Middleware<any> = async (params, next) => {
  if (
    !params.model ||
    !(config.db.softDelete.models as Prisma.ModelName[]).includes(params.model)
  ) {
    return next(params);
  }
  if (params.action === "delete") {
    params.action = "update";
    params.args["data"] = {
      status: Status.DELETED,
    };
  }

  if (params.action === "deleteMany") {
    params.action = "updateMany";
    if (params.args.data !== undefined) {
      params.args.data["status"] = Status.DELETED;
    } else {
      params.args["data"] = {
        status: Status.DELETED,
      };
    }
  }

  return next(params);
};

export default softDeleteMiddleware;
