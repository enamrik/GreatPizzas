FROM podbox/java8

COPY . /backend

WORKDIR /backend

RUN ./gradlew build

CMD ./gradlew run

