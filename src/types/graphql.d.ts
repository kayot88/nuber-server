export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddPlace(name: String!, lastLng: Float!, lastLat: Float!, address: String!, isFavor: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(id: Int!, name: String!, isFavor: Boolean!): EditPlaceResponse!\n  GetNearbyRide: GetNearbyRideResponse!\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, price: Float!, distance: String!, duration: String!): RequestRideResponce!\n  UpdateRideStatus(rideId: Int!, status: statusOpt!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerif(phoneNumber: String!, key: String!): CompletePhoneVerifResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(email: String!, firstName: String!, lastName: String!, age: Int!, password: String!, phoneNumber: String!, profilePhoto: String!): EmailSignUpResponse!\n  FbConnection(firstName: String!, lastName: String!, email: String, fbId: String): FbConResponse!\n  ReportMovement(lastOrientation: Float, lastLat: Float, lastLng: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateMyProfile(email: String, firstName: String, lastName: String, age: Int, password: String, profilePhoto: String): UpdateMyProfileResponse!\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponce {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Query {\n  GetMyPlaces: GetMyPlacesResponce!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetNearbyDrivers: GetNearbyDriversRsponse!\n  user: User\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFavor: Boolean!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetNearbyRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype RequestRideResponce {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Subscription {\n  RideSubsc: Ride\n  DriverSubsc: User\n}\n\ntype Ride {\n  id: Int!\n  status: String\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  driver: User!\n  passenger: User!\n  distance: String!\n  duration: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum statusOpt {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerifResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FbConResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetNearbyDriversRsponse {\n  ok: Boolean!\n  error: String\n  drivers: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  fbId: String\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  chat: Chat\n  places: [Place]\n  messages: [Message]\n  # verifications: [Verification]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: String\n  # used: Boolean\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMyPlaces: GetMyPlacesResponce;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
  GetNearbyDrivers: GetNearbyDriversRsponse;
  user: User | null;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetMyPlacesResponce {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFavor: boolean;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  fbId: string | null;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  chat: Chat | null;
  places: Array<Place> | null;
  messages: Array<Message> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface Ride {
  id: number;
  status: string | null;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  driver: User;
  passenger: User;
  distance: string;
  duration: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetNearbyDriversRsponse {
  ok: boolean;
  error: string | null;
  drivers: Array<User> | null;
}

export interface Mutation {
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  GetNearbyRide: GetNearbyRideResponse;
  RequestRide: RequestRideResponce;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerif: CompletePhoneVerifResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FbConnection: FbConResponse;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface AddPlaceMutationArgs {
  name: string;
  lastLng: number;
  lastLat: number;
  address: string;
  isFavor: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  id: number;
  name: string;
  isFavor: boolean;
}

export interface RequestRideMutationArgs {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: statusOpt;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerifMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  phoneNumber: string;
  profilePhoto: string;
}

export interface FbConnectionMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string | null;
}

export interface ReportMovementMutationArgs {
  lastOrientation: number | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  password: string | null;
  profilePhoto: string | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface GetNearbyRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface RequestRideResponce {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export type statusOpt = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerifResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FbConResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  RideSubsc: Ride | null;
  DriverSubsc: User | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: string | null;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}
