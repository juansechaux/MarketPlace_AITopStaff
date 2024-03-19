from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, Review, Observation

class UserSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin'] # campos que queremos enviar al frontend
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializers):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializers(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializers(reviews, many=True)
        return serializer.data


# class ShippingAddressSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = ShippingAddress
#         fields = '__all__'

class ObservationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'

class OrderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializers(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    # shippingAddress = serializers.SerializerMethodField(read_only=True)
    observation = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializers(items, many=True)
        return serializer.data
    
    # def get_shippingAddress(self, obj):
    #     try:
    #         address = ShippingAddressSerializers(obj.shippingaddress, many=False).data
    #     except:
    #         address = False
    #     return address
    
    def get_observation(self, obj):
        try:
            haveObservation = ObservationSerializers(obj.observation, many=False).data
        except:
            haveObservation = 'none'
        return haveObservation
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializers(user, many=False)
        return serializer.data