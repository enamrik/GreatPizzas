import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class FakeRepository {
    public List<Special> getSpecials() {
        return newArrayList(
                new Special("Veggie Pizza", "Best veggie pizza ever!", "http://localhost:4567/images/meat_lovers_pizza.jpg"),
                new Special("Meat Lovers Pizza", "Best meat lovers pizza ever!", "http://localhost:4567/images/veggie_pizza.jpg"),
                new Special("Hawaiian Pizza", "Best hawaiian pizza ever!", "http://localhost:4567/images/hawaiian_pizza.jpg")
        );
    }

    public byte[] getImageById(String imageId) throws IOException {
        InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream(imageId);
        return IOUtils.toByteArray(resourceAsStream);
    }
}
