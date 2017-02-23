<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="accounts")
     */
    class Account{
        /**
         * @ORM\Id
         * @ORM\Column(type="integer")
         * @ORM\GeneratedValue
         */
        protected $id;

        /**
         * @ORM\Column(type="string")
         */
        protected $name;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        /**
         * @ORM\Column(type="string")
         */
        protected $address;

        public function __construct($name, $address)
        {
            $this->name = $name;
            $this->address = $address;
        }

        public function getId()
        {
            return $this->id;
        }

        public function getName()
        {
            return $this->name;
        }

        public function getAddress()
        {
            return $this->address;
        }

        public function setId($id)
        {
            $this->id = $id;
            return $this;
        }

        public function setName($name)
        {
            $this->name = $name;
            return $this;
        }

        public function setAddress($address)
        {
            $this->address = $address;
            return $this;
        }

        public function __destruct(){}
    }
