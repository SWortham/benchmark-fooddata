FROM --platform=${BUILDPLATFORM} mcr.microsoft.com/dotnet/sdk:7.0.203-alpine3.17 as build
# Stage 1: Define base image that will be used for production
FROM mcr.microsoft.com/dotnet/aspnet:7.0.5-alpine3.17 AS base
WORKDIR /app
EXPOSE 80


# Stage 2: Build and publish the code
FROM mcr.microsoft.com/dotnet/sdk:7.0.203-alpine3.17 AS build
WORKDIR /app
COPY csharp.csproj .
RUN dotnet restore
COPY . .
RUN dotnet build -c Release

FROM build AS publish
RUN dotnet publish -c Release -o /publish


# Stage 3: Build and publish the code
FROM base AS final
WORKDIR /app
COPY --from=publish /publish .
ENTRYPOINT ["dotnet", "csharp.dll"]

