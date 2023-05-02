docker compose down

select container_name in bun csharp go nodejs python
do
printf "Restarting $container_name \n"
docker-compose up -d --no-deps --build $container_name
exit
done
