docker compose down

select container_name in bun csharp go nodejs
do
printf "Restarting $container_name \n"
docker-compose up -d --no-deps --build $container_name
exit
done
