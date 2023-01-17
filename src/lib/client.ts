import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import { UsersClient } from "@proto/rpc.client";

export const client = new UsersClient(
  new TwirpFetchTransport({ baseUrl: "http://localhost:8000" })
);

export default client;
