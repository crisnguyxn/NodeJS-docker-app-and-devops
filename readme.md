docker
    create image
        docker build -t <name_of_image> .
    create and run container
        docker run -d --name <name_of_container> <name_of_image>
    remove container
        docker rm <name_of_container> -f
    remove image
        docker rm <name_of_image> -f
    run in localhost
        docker run -p localport:dockerport --name <name_of_container> <name_of_image>
    spec in bash terminal ( app directory)
        docker exec -it <name_of_container> bash
    sync all file in local and docker directory
        docker run -v ${pwd}:/<WORKDIR> -p localport:dockerport --name <name_of_container> <name_of_image>
    --env
        --env PORT=400
    --env-file
        ./.env
    
    encapsulation both image and container (docker-compose.yml)

    docker-compose up -d
    docker-compose down -v

    setup in DEV environment and PRODUCTION Environment
    
    
    structure of docker-compose.yml file

    versions:
    services:
        app_container_name
            build:
                context:
                args
            environment
            ports:
            volumes

        